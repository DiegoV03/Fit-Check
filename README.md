Dependencies Install
1. Run npm install --legacy-peer-deps
2. Run npm install
3. npm start


Completed Features
1. Database
Install and configure PostgreSQL
Create database and users

fitcheck Database
fitcheck_user Database User
Database Administration

Configuring SQLAlchemy for Database Connectivity
Database Migration with Alembic
Create users table

Store user information (username, email, password)

2. FastAPI Backend
FastAPI Server Setup
User related API

POST /users/ - Register users
GET /users/ - get all users
POST /login - user login, return JWT token
Security

bcrypt for password hash storage
JWT generates access_token for authentication
API Testing

API debugging via curl
Access to Swagger UI testing interface (http://127.0.0.1:8000/docs)

Installation and operation

1. clone warehouse

git clone https://github.com/your-repo/FitCheck.git
cd FitCheck

2. Creating a Python Virtual Environment and Installing Dependencies

python -m venv venv
source venv/bin/activate  # MacOS/Linux
venv\Scripts\activate    # Windows
pip install -r requirements.txt

3. Configuring the PostgreSQL Database

Ensure that PostgreSQL is installed and execute the following commands to create the database and users:
CREATE DATABASE fitcheck;
CREATE USER fitcheck_user WITH PASSWORD 'fitcheck_password';
ALTER ROLE fitcheck_user SET client_encoding TO 'utf8';
ALTER ROLE fitcheck_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE fitcheck_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE fitcheck TO fitcheck_user;

4. Configuring Database Connections

DATABASE_URL = "postgresql://fitcheck_user:fitcheck_password@localhost/fitcheck"

5. Running a database migration

alembic init migrations
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

6. Running the FastAPI Server

uvicorn app.main:app --reload
The server will run on http://127.0.0.1:8000
