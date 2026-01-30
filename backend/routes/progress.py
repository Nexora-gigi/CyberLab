from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Progress

router = APIRouter(prefix="/progress", tags=["Progress"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/update")
def update_progress(username: str, lab_id: str, progress: int, db: Session = Depends(get_db)):
    record = db.query(Progress).filter(
        Progress.username == username,
        Progress.lab_id == lab_id
    ).first()

    if record:
        record.progress = progress
    else:
        record = Progress(
            username=username,
            lab_id=lab_id,
            progress=progress
        )
        db.add(record)

    db.commit()
    return {"message": "Progress saved"}

@router.get("/{username}")
def get_progress(username: str, db: Session = Depends(get_db)):
    records = db.query(Progress).filter(Progress.username == username).all()
    return {r.lab_id: r.progress for r in records}
