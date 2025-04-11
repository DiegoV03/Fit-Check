from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    clothes = relationship("ClothingItem", back_populates="owner")


class ClothingItem(Base):
    __tablename__ = "clothes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    color = Column(String, nullable=False)
    category = Column(String, default="", nullable=False)
    fabric = Column(String, default="", nullable=False)
    size = Column(String, default="", nullable=False)
    length = Column(String, default="", nullable=False)
    image_url = Column(String, default="")
    description = Column(String, default="")
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner = relationship("User", back_populates="clothes")