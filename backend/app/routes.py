from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from auth import create_access_token
from database import cursor, conn

router = APIRouter()

# --------------------
# Mock users (can replace with real DB later)
# --------------------
users = {
    "admin": "admin123",
    "student": "password"
}

# --------------------
# Pydantic models
# --------------------
class LoginData(BaseModel):
    username: str
    password: str

class LabCompleteData(BaseModel):
    username: str
    lab_id: str

class PasswordCheck(BaseModel):
    password: str

# --------------------
# LOGIN ROUTE
# --------------------
@router.post("/login")
def login(data: LoginData):
    if data.username in users and users[data.username] == data.password:
        token = create_access_token({"sub": data.username})
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# --------------------
# LAB 1: Phishing Lab
# --------------------
@router.get("/lab/phishing")
def phishing_lab():
    return {
        "question": "Is this email safe?",
        "email": "Your account has been compromised. Click here now!"
    }

# --------------------
# LAB 2: Password Strength Lab
# --------------------
def evaluate_password(password: str):
    score = 0
    if len(password) >= 8:
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(c.isupper() for c in password):
        score += 1
    if any(c in "!@#$%^&*" for c in password):
        score += 1

    if score <= 1:
        return "Weak"
    elif score == 2:
        return "Medium"
    return "Strong"

@router.post("/lab/password/check")
def check_password(data: PasswordCheck):
    strength = evaluate_password(data.password)
    return {"strength": strength}

# --------------------
# LAB 3: Object Detection Lab (mock)
# --------------------
@router.post("/lab/object/detect")
def detect_object():
    return {"objects": ["Person", "Laptop", "Phone"]}

# --------------------
# LAB 4: Save User Progress
# --------------------
@router.post("/progress/complete")
def complete_lab(data: LabCompleteData):
    cursor.execute(
        "INSERT INTO progress (username, lab) VALUES (?, ?)",
        (data.username, data.lab_id)
    )
    conn.commit()
    return {"message": "Lab progress saved"}

# --------------------
# GET USER PROGRESS
# --------------------
@router.get("/progress/{username}")
def get_progress(username: str):
    cursor.execute(
        "SELECT lab FROM progress WHERE username = ?",
        (username,)
    )
    labs = cursor.fetchall()
    return {"completed_labs": [lab[0] for lab in labs]}
