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
