# FitCheck - Full Stack Wardrobe Management App

FitCheck is a full-stack wardrobe management system built with FastAPI (backend), React (frontend), and PostgreSQL (database). It supports user authentication, clothing storage, smart classification, and outfit recommendation.

---

## Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: FastAPI
- **Database**: PostgreSQL
- **Authentication**: JWT + bcrypt
- **ORM**: SQLAlchemy
- **Migration Tool**: Alembic

---

## Setup & Installation

### Backend - FastAPI + PostgreSQL

1. **Clone Repository**
```bash
git clone https://github.com/your-repo/FitCheck.git
cd FitCheck
```

2. **Set Up Virtual Environment & Install Dependencies**
```bash
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate          # Windows
pip install -r requirements.txt
```

3. **Install and Configure PostgreSQL**

Make sure PostgreSQL is installed. Run the following SQL commands:
```sql
CREATE DATABASE fitcheck;
CREATE USER fitcheck_user WITH PASSWORD 'fitcheck_password';
ALTER ROLE fitcheck_user SET client_encoding TO 'utf8';
ALTER ROLE fitcheck_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE fitcheck_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE fitcheck TO fitcheck_user;
```

4. **Set Up Environment Configuration**
Create a `.env` file in the root directory with the following:
```
DATABASE_URL=postgresql://fitcheck_user:fitcheck_password@localhost/fitcheck
```

5. **Run Database Migrations**
```bash
alembic init migrations
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

6. **Run FastAPI Server**
```bash
uvicorn app.main:app --reload
```
Access Swagger API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Frontend - React

1. **Navigate to Frontend Directory**
```bash
cd frontend
```

2. **Install Node Dependencies**
```bash
npm install --legacy-peer-deps
npm install
```

3. **Start Development Server**
```bash
npm start
```
View app at: [http://localhost:3000](http://localhost:3000)

---

## Implemented Features

### Database Setup
- PostgreSQL installation and user setup
- Alembic migration management
- SQLAlchemy models and connection configuration

### FastAPI Backend
- `POST /users/` – user registration
- `GET /users/` – fetch users
- `POST /login` – user login, returns JWT
- bcrypt password hashing
- JWT authentication token
- Swagger UI API Testing

### React Frontend
- User registration and login forms
- Integration with backend APIs
- Placeholder for clothing management UI

---

## API Testing
- `curl` or Postman
- Swagger UI at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## Build & Deployment

### Frontend
```bash
npm run build
```
Builds static files into the `build/` directory for production deployment.

---

## Best Practices Demonstrated

-  GitHub repository with issue tracking and PR management
-  Alembic for repeatable database schema migrations
-  Separation of environment config with `.env` file
-  ORM usage via SQLAlchemy for maintainable models
-  Password security with bcrypt, token auth with JWT
-  FastAPI Swagger integration for live API docs

---

## License
MIT

---

## Contributors
- Junjie Ao
- Zheyu Deng
- Ben Rodgers
- Diego Vazquez
- Henry Hanson
