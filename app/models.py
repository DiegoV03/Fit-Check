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
<<<<<<< HEAD
    name = Column(String, nullable=False)
    color = Column(String, nullable=False)
    category = Column(String, default="", nullable=False)
    fabric = Column(String, default="", nullable=False)
    size = Column(String, default="", nullable=False)
    length = Column(String, default="", nullable=False)
    image_url = Column(String, default="")
    description = Column(String, default="")
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
=======
    name = Column(String, index=True)
    color = Column(String)
    category = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
    owner = relationship("User", back_populates="clothes")