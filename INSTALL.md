#  FitCheck Installation Guide

This document explains how to set up the FitCheck project locally, including the backend (FastAPI + PostgreSQL) and frontend (React).

---

## Project Structure

- Backend: `D:/Fit-Check`
- Frontend: `D:/Fit-Check/fit-check`

---

## 1️ Clone the Repository

```bash
git clone https://github.com/DiegoV03/Fit-Check.git
cd Fit-Check
```

---

## 2️ Backend Setup (Python + FastAPI)

### 2.1 Create and Activate Virtual Environment

```bash
python -m venv venv
# For Windows:
venv\Scripts\activate
# For Mac/Linux:
source venv/bin/activate
```

### 2.2 Install Dependencies

```bash
pip install -r requirements.txt
```

### 2.3 Set Up PostgreSQL Database

Ensure PostgreSQL is installed and running.

```sql
-- Run this in psql:
CREATE DATABASE fitcheck;
CREATE USER fitcheck_user WITH PASSWORD 'fitcheck_password';
ALTER ROLE fitcheck_user SET client_encoding TO 'utf8';
ALTER ROLE fitcheck_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE fitcheck_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE fitcheck TO fitcheck_user;
```

### 2.4 Run Database Migration

```bash
alembic upgrade head
```

---

## 3️⃣ Run the Backend Server

```bash
uvicorn app.main:app --reload
# Access Swagger docs at: http://127.0.0.1:8000/docs
```

---

## 4️⃣ Frontend Setup (React)

### 4.1 Navigate to Frontend Directory

```bash
cd fit-check
```

### 4.2 Install Node Modules

```bash
npm install
```

### 4.3 Run the Development Server

```bash
npm start
# App will be available at http://localhost:3000
```

---

## 5️ Optional: Environment Variables

You may create a `.env` file in the backend root directory with the following values:

```
DATABASE_URL=postgresql://fitcheck_user:fitcheck_password@localhost/fitcheck
SECRET_KEY=your_jwt_secret_key_here
```

For reference, see `.env.example`.

---

Happy coding! 🎉