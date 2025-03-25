Dependencies Install
1. Run npm install --legacy-peer-deps
2. Run npm install
3. npm start


Completed Features
1.  PostgreSQL Database
PostgreSQL installation and setup

fitcheck database

fitcheck_user database user

Integrated with SQLAlchemy ORM

Alembic database migration system

Tables:

users (username, email, hashed password)

clothes (name, color, category, fabric, size, length, owner_id)

2. FastAPI Backend
FastAPI server setup with modular structure

User-related APIs:

POST /users/ – Register new user

GET /users/ – Get all users

POST /token – Login and return JWT token

Clothing-related APIs (authentication required):

GET /clothes/ – List current user's clothes

GET /clothes/{item_id} – View clothing item detail

POST /clothes/ – Add new clothing item

Security
Passwords hashed using bcrypt

JWT token-based authentication with OAuth2

Auth-protected endpoints with Depends(get_current_user)

API Testing
Swagger UI: http://127.0.0.1:8000/docs

curl/Postman testing supported

Setup Guide
1. Clone Repository

git clone https://github.com/DiegoV03/Fit-Check.git
cd FitCheck

2. Python Virtual Environment & Dependencies

python -m venv venv
# For macOS/Linux:
source venv/bin/activate
# For Windows:
venv\Scripts\activate

pip install -r requirements.txt

3. Configure PostgreSQL Database
Make sure PostgreSQL is installed. Then:

CREATE DATABASE fitcheck;
CREATE USER fitcheck_user WITH PASSWORD 'fitcheck_password';
ALTER ROLE fitcheck_user SET client_encoding TO 'utf8';
ALTER ROLE fitcheck_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE fitcheck_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE fitcheck TO fitcheck_user;

4. Set Database URL (in .env or config)

DATABASE_URL = "postgresql://fitcheck_user:fitcheck_password@localhost/fitcheck"

5. Run Database Migrations with Alembic

alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

6. Launch FastAPI Backend

uvicorn app.main:app --reload
Server will run on: http://127.0.0.1:8000

