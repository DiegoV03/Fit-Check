
from pydantic import BaseModel, EmailStr

# User registration request model
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# User return model (no password return)
class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True