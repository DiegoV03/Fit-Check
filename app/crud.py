from sqlalchemy.orm import Session
from app.models import ClothingItem
from app.schemas import ClothingItemCreate

def create_clothing_item(db: Session, item: ClothingItemCreate, owner_id: int):
<<<<<<< HEAD
    item_dict = item.dict()

    for field in ['category', 'fabric', 'size', 'length']:
        if item_dict[field] is None:
            item_dict[field] = ""

    db_item = ClothingItem(**item_dict, owner_id=owner_id)
=======
    db_item = ClothingItem(**item.dict(), owner_id=owner_id)
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

<<<<<<< HEAD

=======
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
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