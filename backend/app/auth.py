from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from app.schema import RegisterRequest, LoginRequest, MessageResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=MessageResponse)
def register_user(data: RegisterRequest, db: Session = Depends(get_db)):
    # Check if username exists
    if db.query(User).filter(User.username == data.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")

    # Check if email exists
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        username=data.username,
        full_name=data.full_name,
        email=data.email,
        password=data.password  # (we’ll hash later)
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Registration successful"}

@router.post("/login", response_model=MessageResponse)
def login_user(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.username == data.username,
        User.password == data.password
    ).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful"}
