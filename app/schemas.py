from typing import Optional
from pydantic import BaseModel, EmailStr
from pydantic import BaseModel

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

class ClothingItemCreate(BaseModel):
    name: str
    color: str
    description: str = ""
    image_url: str = ""
    category: str = ""
    fabric: str = ""
    size: str = ""
    length: str = ""

class ClothingItemResponse(BaseModel):
    id: int
    name: str
    color: str
    category: str
    fabric: Optional[str] = None
    size: Optional[str] = None
    length: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None
    owner_id: int

    class Config:
        from_attributes = True

# For scraper
class ScrapeRequest(BaseModel):
    url: str