from passlib.context import CryptContext

# Set password hash algorithm
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Encrypted passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)