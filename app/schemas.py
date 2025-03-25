from typing import Optional
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

# User login request format
class UserLogin(BaseModel):
    email: str
    password: str

# Token response format
class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class ClothingItemBase(BaseModel):
    name: str
    color: str
    category: str
    fabric: str
    size: str
    length: str

class ClothingItemCreate(ClothingItemBase):
    pass

class ClothingItemResponse(ClothingItemBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True