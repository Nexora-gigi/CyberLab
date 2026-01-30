from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# User model
class User(BaseModel):
    username: str
    full_name: str
    email: str
    password: str

@app.post("/register")
def register(user: User):
    conn = sqlite3.connect("cyberlab.db")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            username TEXT PRIMARY KEY,
            full_name TEXT,
            email TEXT,
            password TEXT,
            xp INTEGER DEFAULT 0
        )
    """)
    cur.execute(
        "INSERT INTO users(username, full_name, email, password) VALUES (?, ?, ?, ?)",
        (user.username, user.full_name, user.email, user.password)
    )
    conn.commit()
    conn.close()
    return {"status": "success", "message": "Registration complete"}

@app.post("/progress/update")
def update_progress(username: str, lab_id: str, progress: int):
    conn = sqlite3.connect("cyberlab.db")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS progress (
            username TEXT,
            lab_id TEXT,
            progress INTEGER,
            PRIMARY KEY(username, lab_id)
        )
    """)
    cur.execute("""
        INSERT INTO progress(username, lab_id, progress)
        VALUES (?, ?, ?)
        ON CONFLICT(username, lab_id) DO UPDATE SET progress=excluded.progress
    """, (username, lab_id, progress))
    conn.commit()
    conn.close()
    return {"status": "success"}

class XPUpdate(BaseModel):
    username: str
    xp: int

@app.post("/progress/update_xp")
def update_xp(data: XPUpdate):
    conn = sqlite3.connect("cyberlab.db")
    cur = conn.cursor()
    cur.execute("UPDATE users SET xp = xp + ? WHERE username = ?", (data.xp, data.username))
    conn.commit()
    conn.close()
    return {"status": "success", "added_xp": data.xp}

@app.get("/progress/{username}")
def get_progress(username: str):
    conn = sqlite3.connect("cyberlab.db")
    cur = conn.cursor()
    cur.execute("SELECT lab_id, progress FROM progress WHERE username = ?", (username,))
    rows = cur.fetchall()
    progress = {lab: p for lab, p in rows}
    cur.execute("SELECT xp FROM users WHERE username = ?", (username,))
    xp_row = cur.fetchone()
    total_xp = xp_row[0] if xp_row else 0
    conn.close()
    progress["total_xp"] = total_xp
    return progress
