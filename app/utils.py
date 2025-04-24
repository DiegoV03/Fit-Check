from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.database import SessionLocal
from app.models import User
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer


# Set password hash algorithm
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Key for generating JWT tokens (please replace with a more secure value)
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password encryption
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Encrypted passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Generate JWT tokens
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Authenticate JWT tokens
def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

def normalize_color(raw_color: str) -> str:
    raw_color = raw_color.lower()
    mapping = {
        "light blue": "light blue", "blue": "blue",
        "navy blue": "navy", "sky blue": "light blue",
        "oyster-white": "white", "white": "white",
        "black": "black", "grey": "gray", "gray": "gray",
        "red": "red", "pink": "pink", "beige": "beige",
        "green": "green", "yellow": "yellow",
        "brown": "brown", "taupe brown": "brown",
        "purple": "purple", "lavender": "lavender",
        "orange": "orange", "maroon": "maroon",
        "light indigo": "blue", "indigo": "blue"
    }

    # match known color
    for k, v in mapping.items():
        if k in raw_color:
            return v

    return "other"