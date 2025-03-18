from sqlalchemy.orm import Session
from app.models import ClothingItem
from app.schemas import ClothingItemCreate

def create_clothing_item(db: Session, item: ClothingItemCreate, owner_id: int):
    db_item = ClothingItem(**item.dict(), owner_id=owner_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_clothing_items(db: Session, owner_id: int):
    return db.query(ClothingItem).filter(ClothingItem.owner_id == owner_id).all()

def get_clothing_item(db: Session, item_id: int, owner_id: int):
    return db.query(ClothingItem).filter(ClothingItem.id == item_id, ClothingItem.owner_id == owner_id).first()

def update_clothing_item(db: Session, item_id: int, item_data: ClothingItemCreate, owner_id: int):
    db_item = db.query(ClothingItem).filter(ClothingItem.id == item_id, ClothingItem.owner_id == owner_id).first()
    if db_item:
        for key, value in item_data.dict().items():
            setattr(db_item, key, value)
        db.commit()
        db.refresh(db_item)
    return db_item

def delete_clothing_item(db: Session, item_id: int, owner_id: int):
    db_item = db.query(ClothingItem).filter(ClothingItem.id == item_id, ClothingItem.owner_id == owner_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item