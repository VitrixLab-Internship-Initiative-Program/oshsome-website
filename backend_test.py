#!/usr/bin/env python3
"""
Backend API Tests for OSHSOME Consultancy
Tests all backend endpoints with proper validation and error handling
"""

import requests
import json
import sys
from datetime import datetime
import time

# Use the production URL from frontend/.env
BASE_URL = "https://oshsome-training.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = []
        self.failed_tests = []
        
    def log_result(self, test_name, success, message="", response_data=None):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        result = {
            "test": test_name,
            "status": status,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.results.append(result)
        if not success:
            self.failed_tests.append(result)
        print(f"{status}: {test_name} - {message}")
        
    def test_health_check(self):
        """Test GET / endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_result("Health Check", True, f"Status: {response.status_code}, Response: {data}")
                    return True
                else:
                    self.log_result("Health Check", False, f"Missing 'message' field in response: {data}")
                    return False
            else:
                self.log_result("Health Check", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_result("Health Check", False, f"Request failed: {str(e)}")
            return False
            
    def test_proposals_crud(self):
        """Test POST and GET /proposals endpoints"""
        # Test POST /proposals
        proposal_data = {
            "name": "John Smith",
            "email": "john.smith@company.com",
            "company": "Tech Solutions Inc",
            "message": "We need comprehensive training for our development team on modern web technologies.",
            "source_page": "home"
        }
        
        try:
            # POST request
            response = requests.post(f"{BASE_URL}/proposals", 
                                   json=proposal_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 201:
                created_proposal = response.json()
                proposal_id = created_proposal.get("id")
                self.log_result("POST /proposals", True, 
                              f"Created proposal with ID: {proposal_id}", created_proposal)
                
                # Test GET /proposals
                time.sleep(1)  # Brief delay to ensure data is persisted
                get_response = requests.get(f"{BASE_URL}/proposals", timeout=10)
                
                if get_response.status_code == 200:
                    proposals = get_response.json()
                    # Check if our created proposal appears in the list
                    found_proposal = None
                    for p in proposals:
                        if p.get("id") == proposal_id:
                            found_proposal = p
                            break
                    
                    if found_proposal:
                        self.log_result("GET /proposals", True, 
                                      f"Found created proposal in list. Total proposals: {len(proposals)}")
                        return True
                    else:
                        self.log_result("GET /proposals", False, 
                                      f"Created proposal not found in list. Total: {len(proposals)}")
                        return False
                else:
                    self.log_result("GET /proposals", False, 
                                  f"Status: {get_response.status_code}, Response: {get_response.text}")
                    return False
            else:
                self.log_result("POST /proposals", False, 
                              f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_result("Proposals CRUD", False, f"Request failed: {str(e)}")
            return False
            
    def test_wem_requests_crud(self):
        """Test POST and GET /wem-requests endpoints"""
        wem_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@enterprise.com",
            "company": "Enterprise Corp",
            "message": "Interested in Workforce Engagement Management solutions for our 500+ employee organization.",
            "source_page": "wem"
        }
        
        try:
            # POST request
            response = requests.post(f"{BASE_URL}/wem-requests", 
                                   json=wem_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 201:
                created_wem = response.json()
                wem_id = created_wem.get("id")
                self.log_result("POST /wem-requests", True, 
                              f"Created WEM request with ID: {wem_id}", created_wem)
                
                # Test GET /wem-requests
                time.sleep(1)
                get_response = requests.get(f"{BASE_URL}/wem-requests", timeout=10)
                
                if get_response.status_code == 200:
                    wem_requests = get_response.json()
                    # Check if our created WEM request appears in the list
                    found_wem = None
                    for w in wem_requests:
                        if w.get("id") == wem_id:
                            found_wem = w
                            break
                    
                    if found_wem:
                        self.log_result("GET /wem-requests", True, 
                                      f"Found created WEM request in list. Total: {len(wem_requests)}")
                        return True
                    else:
                        self.log_result("GET /wem-requests", False, 
                                      f"Created WEM request not found in list. Total: {len(wem_requests)}")
                        return False
                else:
                    self.log_result("GET /wem-requests", False, 
                                  f"Status: {get_response.status_code}, Response: {get_response.text}")
                    return False
            else:
                self.log_result("POST /wem-requests", False, 
                              f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_result("WEM Requests CRUD", False, f"Request failed: {str(e)}")
            return False
            
    def test_contacts_crud(self):
        """Test POST and GET /contacts endpoints"""
        contact_data = {
            "name": "Michael Brown",
            "email": "michael.brown@consulting.com",
            "company": "Brown Consulting",
            "message": "I would like to discuss potential partnership opportunities and learn more about your services.",
            "source_page": "contact"
        }
        
        try:
            # POST request
            response = requests.post(f"{BASE_URL}/contacts", 
                                   json=contact_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 201:
                created_contact = response.json()
                contact_id = created_contact.get("id")
                self.log_result("POST /contacts", True, 
                              f"Created contact with ID: {contact_id}", created_contact)
                
                # Test GET /contacts
                time.sleep(1)
                get_response = requests.get(f"{BASE_URL}/contacts", timeout=10)
                
                if get_response.status_code == 200:
                    contacts = get_response.json()
                    # Check if our created contact appears in the list
                    found_contact = None
                    for c in contacts:
                        if c.get("id") == contact_id:
                            found_contact = c
                            break
                    
                    if found_contact:
                        self.log_result("GET /contacts", True, 
                                      f"Found created contact in list. Total: {len(contacts)}")
                        return True
                    else:
                        self.log_result("GET /contacts", False, 
                                      f"Created contact not found in list. Total: {len(contacts)}")
                        return False
                else:
                    self.log_result("GET /contacts", False, 
                                  f"Status: {get_response.status_code}, Response: {get_response.text}")
                    return False
            else:
                self.log_result("POST /contacts", False, 
                              f"Status: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_result("Contacts CRUD", False, f"Request failed: {str(e)}")
            return False
            
    def test_validation_errors(self):
        """Test negative cases - validation errors"""
        # Test POST /contacts missing required message field
        try:
            invalid_contact = {
                "name": "Test User",
                "email": "test@example.com",
                "company": "Test Company"
                # Missing required 'message' field
            }
            
            response = requests.post(f"{BASE_URL}/contacts", 
                                   json=invalid_contact, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 422:
                self.log_result("POST /contacts missing message (422)", True, 
                              f"Correctly returned 422 for missing message field")
            else:
                self.log_result("POST /contacts missing message (422)", False, 
                              f"Expected 422, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("POST /contacts missing message (422)", False, f"Request failed: {str(e)}")
            
        # Test POST /proposals with invalid email
        try:
            invalid_proposal = {
                "name": "Test User",
                "email": "invalid-email-format",  # Invalid email
                "company": "Test Company",
                "message": "Test message"
            }
            
            response = requests.post(f"{BASE_URL}/proposals", 
                                   json=invalid_proposal, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 422:
                self.log_result("POST /proposals invalid email (422)", True, 
                              f"Correctly returned 422 for invalid email format")
            else:
                self.log_result("POST /proposals invalid email (422)", False, 
                              f"Expected 422, got {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("POST /proposals invalid email (422)", False, f"Request failed: {str(e)}")
            
    def test_cors_headers(self):
        """Test CORS headers are present"""
        endpoints_to_test = [
            ("GET", f"{BASE_URL}/"),
            ("GET", f"{BASE_URL}/proposals"),
            ("POST", f"{BASE_URL}/proposals")
        ]
        
        for method, url in endpoints_to_test:
            try:
                # Add Origin header to trigger CORS response
                headers = {"Origin": "https://example.com"}
                
                if method == "GET":
                    response = requests.get(url, headers=headers, timeout=10)
                else:  # POST
                    test_data = {
                        "name": "CORS Test",
                        "email": "cors@test.com",
                        "message": "Testing CORS headers"
                    }
                    headers["Content-Type"] = "application/json"
                    response = requests.post(url, json=test_data, headers=headers, timeout=10)
                
                cors_headers = {
                    "access-control-allow-origin": response.headers.get("access-control-allow-origin"),
                    "access-control-allow-credentials": response.headers.get("access-control-allow-credentials"),
                    "access-control-allow-methods": response.headers.get("access-control-allow-methods"),
                    "access-control-allow-headers": response.headers.get("access-control-allow-headers")
                }
                
                if cors_headers["access-control-allow-origin"]:
                    self.log_result(f"CORS Headers {method} {url}", True, 
                                  f"CORS headers present: {cors_headers}")
                else:
                    self.log_result(f"CORS Headers {method} {url}", False, 
                                  f"Missing CORS headers. Found: {cors_headers}")
                    
            except Exception as e:
                self.log_result(f"CORS Headers {method} {url}", False, f"Request failed: {str(e)}")
                
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for OSHSOME Consultancy")
        print(f"📍 Base URL: {BASE_URL}")
        print("=" * 80)
        
        # Run tests in order
        self.test_health_check()
        self.test_proposals_crud()
        self.test_wem_requests_crud()
        self.test_contacts_crud()
        self.test_validation_errors()
        self.test_cors_headers()
        
        # Summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for failed in self.failed_tests:
                print(f"  - {failed['test']}: {failed['message']}")
                
        print(f"\n✅ Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        return len(self.failed_tests) == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Check backend logs for email notifications
    print("\n" + "=" * 80)
    print("📋 ADDITIONAL CHECKS")
    print("=" * 80)
    print("Note: Email notification logs should be checked in backend server logs")
    print("Expected: '[EMAIL-LOG-ONLY] New Training Proposal Request' entries for proposal submissions")
    
    sys.exit(0 if success else 1)