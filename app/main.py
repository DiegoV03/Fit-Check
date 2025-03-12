from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import User
from app.schemas import UserLogin, UserCreate, UserResponse, TokenResponse
from app.utils import verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

app = FastAPI()

# Dependencies: Getting a database connection
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Welcome to FitCheck Backend"}

@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# User Registration API
@app.post("/users/", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if the username or mailbox already exists
    existing_user = db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username or email already exists")

    # Create users
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password) # Encrypted passwords
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user  # Return user information (without password)

# User Login API
@app.post("/login", response_model=TokenResponse)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    # Check if the user exists
    user = db.query(User).filter(User.email == user_login.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Verify password
    if not verify_password(user_login.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # Generate JWT tokens
    access_token = create_access_token(data={"sub": user.email})

    return {"access_token": access_token, "token_type": "bearer"}