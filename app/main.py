from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import User, ClothingItem
from app.schemas import UserLogin, UserCreate, UserResponse, TokenResponse, ClothingItemCreate, ClothingItemResponse
from app.utils import verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_current_user
from app.crud import create_clothing_item, get_clothing_items, get_clothing_item, update_clothing_item, delete_clothing_item

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

@app.get("/me/")
def read_users_me(current_user: User = Depends(get_current_user)):
    return {"id": current_user.id, "username": current_user.username, "email": current_user.email}

@app.get("/users/")
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.get("/protected/")
def protected_endpoint(current_user: User = Depends(get_current_user)):
    return {"message": "This is a protected route!", "user": current_user.username}

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

# Add clothes
@app.post("/clothes/", response_model=ClothingItemResponse)
def add_clothing(item: ClothingItemCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return create_clothing_item(db, item, owner_id=current_user.id)

#  Get All Clothes
@app.get("/clothes/", response_model=list[ClothingItemResponse])
def list_clothing_items(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return get_clothing_items(db, owner_id=current_user.id)

# Get individual clothing details
@app.get("/clothes/{item_id}", response_model=ClothingItemResponse)
def retrieve_clothing_item(item_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    item = get_clothing_item(db, item_id, owner_id=current_user.id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Update clothing
@app.put("/clothes/{item_id}", response_model=ClothingItemResponse)
def update_item(item_id: int, item_data: ClothingItemCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    item = update_clothing_item(db, item_id, item_data, owner_id=current_user.id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

# Remove clothes
@app.delete("/clothes/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    item = delete_clothing_item(db, item_id, owner_id=current_user.id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted"}