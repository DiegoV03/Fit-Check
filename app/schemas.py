from typing import Optional
from pydantic import BaseModel, EmailStr

# ---------- User Models ----------

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

# ---------- Clothing Models ----------

class ClothingItemBase(BaseModel):
    name: str
    color: Optional[str]
    category: str
    fabric: Optional[str] = None
    size: Optional[str] = None
    length: Optional[str] = None
    description: Optional[str] = ""
    image_url: Optional[str] = ""

class ClothingItemCreate(ClothingItemBase):
    pass

class ClothingItemResponse(ClothingItemBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True

# ---------- Scraping ----------

class ScrapeRequest(BaseModel):
    url: str
