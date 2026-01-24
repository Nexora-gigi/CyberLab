from fastapi import APIRouter

router = APIRouter()

# Example phishing question
lab_question = {
    "id": 1,
    "email": "Dear user, your account will be locked. Click here to verify.",
    "options": ["Safe", "Phishing"],
    "answer": "Phishing"
}

@router.get("/lab/phishing")
def get_phishing_question():
    return lab_question

# Include this router in main.py
# from app.routes import router
# app.include_router(router)

# Password Security Lab
password_question = {
    "id": 1,
    "prompt": "Test the strength of this password: Nexora123!",
    "answer": "Strong",  # Could be Weak, Medium, Strong
    "options": ["Weak", "Medium", "Strong"]
}

@router.get("/lab/password")
def get_password_question():
    return password_question

# SOC Alerts Lab
soc_alerts = [
    {"id": 1, "alert": "Suspicious login from unknown IP", "severity": "High"},
    {"id": 2, "alert": "Multiple failed login attempts", "severity": "Medium"},
    {"id": 3, "alert": "Unusual file access detected", "severity": "Low"}
]

@router.get("/lab/soc")
def get_soc_alerts():
    return soc_alerts

# Object Detection Lab
object_lab = [
    {"id": 1, "image": "https://via.placeholder.com/150", "label": "Cat"},
    {"id": 2, "image": "https://via.placeholder.com/150", "label": "Dog"}
]

@router.get("/lab/object")
def get_object_lab():
    return object_lab
