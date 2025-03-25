#  FitCheck: Smart Wardrobe Management App

##  Completed Features

###  Database Setup
- PostgreSQL database: `fitcheck`
- Database user: `fitcheck_user`
- Integrated with SQLAlchemy ORM
- Alembic for database migrations

###  Tables
- `users`: `username`, `email`, `hashed_password`
- `clothes`: `name`, `color`, `category`, `fabric`, `size`, `length`, `owner_id`

###  Backend (FastAPI)
- Modular FastAPI server setup
- Passwords securely hashed using `bcrypt`
- JWT authentication using OAuth2
- Swagger API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- `Depends(get_current_user)` for route protection

###  User APIs
| Endpoint         | Method | Description                  |
|------------------|--------|------------------------------|
| `/users/`        | POST   | Register new user            |
| `/users/`        | GET    | Get all users                |
| `/login`         | POST   | Login and return JWT token   |

###  Clothing APIs (requires authentication)
| Endpoint                  | Method | Description                     |
|---------------------------|--------|---------------------------------|
| `/clothes/`               | GET    | List current user's clothes     |
| `/clothes/{item_id}`      | GET    | View clothing item details      |
| `/clothes/`               | POST   | Add new clothing item           |
| `/clothes/{item_id}`      | PUT    | Update clothing item            |
| `/clothes/{item_id}`      | DELETE | Delete clothing item            |

---

##  Setup Guide

### 1. Clone Repository

```bash
git clone https://github.com/DiegoV03/Fit-Check.git
cd FitCheck
```

### 2. Install Dependencies

#### Frontend
```bash
npm install --legacy-peer-deps
npm install
npm start
```

#### Backend (Python)
```bash
python -m venv venv
```

##### For macOS/Linux:
```bash
source venv/bin/activate
```

##### For Windows:
```bash
venv\Scripts\activate
```

```bash
pip install -r requirements.txt
```

---

##  PostgreSQL Configuration

Make sure PostgreSQL is installed, then run:

```sql
CREATE DATABASE fitcheck;
CREATE USER fitcheck_user WITH PASSWORD 'fitcheck_password';

ALTER ROLE fitcheck_user SET client_encoding TO 'utf8';
ALTER ROLE fitcheck_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE fitcheck_user SET timezone TO 'UTC';

GRANT ALL PRIVILEGES ON DATABASE fitcheck TO fitcheck_user;
```

---

##  Environment Config

In your `.env` or settings file:

```env
DATABASE_URL="postgresql://fitcheck_user:fitcheck_password@localhost/fitcheck"
```

---

##  Alembic Migrations

```bash
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

---

##  Launch Backend

```bash
uvicorn app.main:app --reload
```

Server will run at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

##  API Testing
- Swagger UI: `/docs`
- curl/Postman supported