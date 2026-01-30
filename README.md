# 🧪 CyberLab – Interactive Cybersecurity Learning Platform (Demo)

CyberLab is a web-based cybersecurity learning demo designed to simulate hands-on cyber labs in an interactive and engaging way. The platform combines user authentication, guided labs, quizzes, progress tracking, and a modern dark-themed interface to demonstrate practical cybersecurity education.

---

## 🚀 Features

- User registration, login, and logout
- SQLite database integration
- Central dashboard for lab navigation
- Interactive cybersecurity labs
- Mini lectures before each lab
- Multiple activities and quizzes per lab
- Multiple-choice and text-based questions
- Submit before answers are revealed
- Score displayed after submission
- Progress tracked per lab
- Dark, modern, and responsive UI

---

## 🧪 Available Labs

- 🔑 Password Security Lab  
- 🎣 Phishing Awareness Lab  
- 🛡️ SOC (Security Operations Center) Lab  
- 🤖 Object Detection / AI Lab  

---

## 🛠️ Tech Stack

**Frontend**
- React
- React Router
- CSS (custom dark theme)

**Backend**
- FastAPI
- SQLite
- Pydantic

---

## ▶️ How to Run the Project

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
