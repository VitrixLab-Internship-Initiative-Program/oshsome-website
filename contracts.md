# API Contracts - OSHSOME Consultancy

Scope: Replace frontend mocks with backend endpoints for form submissions. All routes are prefixed with /api per ingress rules.

Base URL (frontend): process.env.REACT_APP_BACKEND_URL

Entities:
1) Training Proposal Request (from Home hero form)
2) WEM Request (from Module 1 page CTA form)
3) Contact Message (from Contact page form)

Common Fields:
- id: string (uuid4)
- created_at: ISO datetime (UTC)
- name: string (1..100)
- email: string (valid email)
- company: string (0..120, optional)
- message: string (0..2000, optional)
- source_page: string (optional, e.g., "home", "wem", "contact")

Endpoints:
- POST /api/proposals
  Request: { name, email, company?, message?, source_page? }
  Response: 201 { id, name, email, company?, message?, source_page?, created_at }

- GET /api/proposals
  Query: ?limit=100 (default 100)
  Response: 200 [ Proposal, ... ]

- POST /api/wem-requests
  Request: { name, email, company?, message?, source_page? }
  Response: 201 { id, name, email, company?, message?, source_page?, created_at }

- GET /api/wem-requests
  Response: 200 [ WEMRequest, ... ]

- POST /api/contacts
  Request: { name, email, company?, message, source_page? }
  Response: 201 { id, name, email, company?, message, source_page?, created_at }

Email Notification (for proposals only at this phase):
- If email provider env vars are present, send notification to ops mailbox.
- Env:
  EMAIL_PROVIDER=sendgrid|smtp (future)
  SENDGRID_API_KEY=... (if provider=sendgrid)
  EMAIL_FROM="OSHSOME Consultancy <noreply@yourdomain>"
  EMAIL_TO="Oshsome2025@gmail.com" (or distribution list)
- If not configured, log-only fallback. No failure of API.

Frontend Integration Plan:
- Home.jsx -> onSubmit: POST /api/proposals; fallback to localStorage on error.
- WEM.jsx -> onSubmit: POST /api/wem-requests; fallback to localStorage on error.
- Contact.jsx -> onSubmit: POST /api/contacts; fallback to localStorage on error.
- All requests use const API = `${process.env.REACT_APP_BACKEND_URL}/api`.

Validation & Errors:
- 422 for invalid payloads (FastAPI validation)
- 500 for server/database errors

Security & CORS:
- CORS open for now. No auth required (staging). Sensitive data limited to contact fields.

Testing:
- Use deep_testing_backend_v2 to create, list, and validate responses for each endpoint.

Notes:
- Colors/fonts in UI are still placeholders until exact brand values are shared. No backend dependency.
