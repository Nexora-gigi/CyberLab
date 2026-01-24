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
