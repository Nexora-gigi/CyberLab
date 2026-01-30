from fastapi import HTTPException, APIRouter
from pydantic import BaseModel, EmailStr, validator
from jose import jwt
import sqlite3
from datetime import datetime, timedelta
import re

router = APIRouter()

# JWT setup
SECRET_KEY = "nexora-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# --- DB setup ---
conn = sqlite3.connect("nexora.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE,
    password TEXT
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS progress (
    username TEXT,
    lab TEXT
)
""")

conn.commit()


# --- Pydantic models ---
class RegisterData(BaseModel):
    username: str
    full_name: str
    email: EmailStr
    password: str

    @validator("username")
    def username_valid(cls, v):
        if not re.match("^[A-Za-z0-9_]{3,20}$", v):
            raise ValueError("Username must be 3–20 chars, letters/numbers/_ only")
        return v

    @validator("password")
    def password_valid(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v


class LoginData(BaseModel):
    username: str
    password: str


class LabCompleteData(BaseModel):
    username: str
    lab_id: str


# --- Register ---
@router.post("/register")
def register(data: RegisterData):
    cursor.execute("SELECT username FROM users WHERE username=?", (data.username,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Username already exists")

    cursor.execute("SELECT email FROM users WHERE email=?", (data.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already registered")

    cursor.execute(
        "INSERT INTO users (username, full_name, email, password) VALUES (?, ?, ?, ?)",
        (data.username, data.full_name, data.email, data.password),
    )
    conn.commit()

    return {"message": "Registration complete"}


# --- Login ---
@router.post("/login")
def login(data: LoginData):
    cursor.execute("SELECT password FROM users WHERE username=?", (data.username,))
    row = cursor.fetchone()

    if not row or row[0] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": data.username})
    return {"access_token": token, "token_type": "bearer"}


# --- Progress ---
@router.post("/progress/complete")
def complete_lab(data: LabCompleteData):
    cursor.execute(
        "INSERT INTO progress (username, lab) VALUES (?, ?)",
        (data.username, data.lab_id),
    )
    conn.commit()
    return {"message": "Progress saved"}


@router.get("/progress/{username}")
def get_progress(username: str):
    cursor.execute("SELECT lab FROM progress WHERE username=?", (username,))
    rows = cursor.fetchall()
    return {"completed_labs": [row[0] for row in rows]}


def progress():
    return None