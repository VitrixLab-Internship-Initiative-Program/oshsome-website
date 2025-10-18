from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# --------------------------------------------------------------------------------------
# Models
# --------------------------------------------------------------------------------------
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class BaseSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=120)
    message: Optional[str] = Field(None, max_length=2000)
    source_page: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProposalCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None
    source_page: Optional[str] = None

class Proposal(BaseSubmission):
    pass

class WEMRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: Optional[str] = None
    source_page: Optional[str] = None

class WEMRequest(BaseSubmission):
    pass

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    message: str
    source_page: Optional[str] = None

class Contact(BaseSubmission):
    pass

# --------------------------------------------------------------------------------------
# Utilities (Email Notification - placeholder, provider-integrated later)
# --------------------------------------------------------------------------------------
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

EMAIL_PROVIDER = os.environ.get("EMAIL_PROVIDER")
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY")
EMAIL_FROM = os.environ.get("EMAIL_FROM", "noreply@localhost")
EMAIL_TO = os.environ.get("EMAIL_TO", os.environ.get("NOTIFY_TO", ""))

async def send_email_notification(subject: str, content: str) -> None:
    """
    Email sending stub. If SendGrid credentials are present and package installed,
    attempt to send; else log-only. The real provider integration will be added
    once credentials are provided, following the integration playbook.
    """
    if EMAIL_PROVIDER == "sendgrid" and SENDGRID_API_KEY:
        try:
            from sendgrid import SendGridAPIClient  # type: ignore
            from sendgrid.helpers.mail import Mail  # type: ignore
            if not EMAIL_TO:
                logger.warning("EMAIL_TO not set; skipping email send.")
                return
            message = Mail(from_email=EMAIL_FROM, to_emails=EMAIL_TO, subject=subject, html_content=content)
            sg = SendGridAPIClient(SENDGRID_API_KEY)
            resp = sg.send(message)
            logger.info(f"SendGrid email sent: status={resp.status_code}")
            return
        except Exception as e:
            logger.exception(f"Email send failed; falling back to log-only. Error: {e}")
    # Fallback: log-only
    logger.info(f"[EMAIL-LOG-ONLY] {subject}\n{content}")

# --------------------------------------------------------------------------------------
# Routes
# --------------------------------------------------------------------------------------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Proposals
@api_router.post("/proposals", response_model=Proposal, status_code=201)
async def create_proposal(payload: ProposalCreate):
    proposal = Proposal(**payload.dict())
    try:
        await db.proposals.insert_one(proposal.dict())
    except Exception:
        logger.exception("DB insert error for proposal")
        raise HTTPException(status_code=500, detail="Database error")
    # Fire-and-forget email (no await needed for external sync call)
    try:
        subject = "New Training Proposal Request"
        content = f"<p>Name: {proposal.name}</p><p>Email: {proposal.email}</p><p>Company: {proposal.company or ''}</p><p>Message: {proposal.message or ''}</p><p>Source: {proposal.source_page or ''}</p>"
        await send_email_notification(subject, content)
    except Exception:
        logger.warning("Email notification skipped or failed.")
    return proposal

@api_router.get("/proposals", response_model=List[Proposal])
async def list_proposals(limit: int = 100):
    docs = await db.proposals.find().sort("created_at", -1).to_list(limit)
    return [Proposal(**d) for d in docs]

# WEM Requests
@api_router.post("/wem-requests", response_model=WEMRequest, status_code=201)
async def create_wem_request(payload: WEMRequestCreate):
    item = WEMRequest(**payload.dict())
    try:
        await db.wem_requests.insert_one(item.dict())
    except Exception:
        raise HTTPException(status_code=500, detail="Database error")
    return item

@api_router.get("/wem-requests", response_model=List[WEMRequest])
async def list_wem_requests(limit: int = 100):
    docs = await db.wem_requests.find().sort("created_at", -1).to_list(limit)
    return [WEMRequest(**d) for d in docs]

# Contacts
@api_router.post("/contacts", response_model=Contact, status_code=201)
async def create_contact(payload: ContactCreate):
    item = Contact(**payload.dict())
    try:
        await db.contacts.insert_one(item.dict())
    except Exception:
        raise HTTPException(status_code=500, detail="Database error")
    return item

@api_router.get("/contacts", response_model=List[Contact])
async def list_contacts(limit: int = 100):
    docs = await db.contacts.find().sort("created_at", -1).to_list(limit)
    return [Contact(**d) for d in docs]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
