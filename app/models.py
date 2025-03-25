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
    name = Column(String, index=True)
    color = Column(String)
    category = Column(String)
    fabric = Column(String)
    size = Column(String)
    length = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="clothes")