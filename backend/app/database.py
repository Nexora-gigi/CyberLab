# backend/app/database.py
import sqlite3

conn = sqlite3.connect("cyberlab.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    lab TEXT
)
""")
conn.commit()
