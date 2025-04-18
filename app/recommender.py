# recommender.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ClothingItem
from app.schemas import ClothingItemResponse
from typing import List
from pydantic import BaseModel
from app.utils import get_current_user
from app.models import User

router = APIRouter()

# Color theory
COLOR_THEORY = {
    "red": ["light blue", "blue", "gray", "white", "black", "pink", "beige", "navy", "green"],
    "pink": ["light blue", "blue", "gray", "white", "black", "red", "beige", "green"],
    "blue": ["white", "black", "gray", "red", "pink", "beige", "navy", "yellow", "orange"],
    "white": ["black", "navy", "red", "blue", "pink", "gray", "green", "yellow", "purple", "all"],
    "black": ["white", "red", "pink", "blue", "gray", "yellow", "green", "orange", "purple", "all"],
    "gray": ["black", "white", "red", "pink", "blue", "yellow", "green", "navy"],
    "beige": ["navy", "blue", "black", "white", "green", "brown", "gray"],
    "green": ["white", "black", "beige", "brown", "navy", "gray", "yellow"],
    "brown": ["beige", "white", "blue", "green", "navy", "tan"],
    "navy": ["white", "beige", "red", "pink", "gray", "yellow", "light blue"],
    "yellow": ["navy", "black", "gray", "white", "blue", "purple"],
    "orange": ["black", "navy", "white", "blue", "gray"],
    "purple": ["white", "black", "gray", "yellow", "light blue"],
    "light blue": ["navy", "white", "black", "red", "gray", "purple"],
    "tan": ["brown", "navy", "white", "black", "green"],
    "olive": ["beige", "brown", "tan", "white", "black"],
    "maroon": ["navy", "gray", "beige", "white", "black"],
    "teal": ["white", "black", "gray", "navy", "beige"],
    "coral": ["white", "black", "navy", "gray"],
    "lavender": ["white", "black", "gray", "navy"]
}

class OutfitRecommendation(BaseModel):
    shirt: ClothingItemResponse
    pants: ClothingItemResponse
    accessory: ClothingItemResponse

@router.post("/recommend-outfits", response_model=List[OutfitRecommendation])
async def recommend_outfits(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # Get all clothing items for the current user
        clothing_items = db.query(ClothingItem).filter(
            ClothingItem.owner_id == current_user.id
        ).all()
        
        # Categorize items
        categories = {
            "shirts": [item for item in clothing_items if item.category.lower() in ["shirt", "outerwear", "top"]],
            "pants": [item for item in clothing_items if item.category.lower() in ["pants"]],
            "accessories": [item for item in clothing_items if item.category.lower() in ["accessory", "other"]]
        }
        
        outfits = []
        
        for shirt in categories["shirts"]:
            main_color = shirt.color.lower()
            complementary_colors = COLOR_THEORY.get(main_color, [])
            
            for pants in categories["pants"]:
                if pants.color.lower() in complementary_colors:
                    pants_color = pants.color.lower()
                    shirt_colors = COLOR_THEORY.get(main_color, [])
                    pants_colors = COLOR_THEORY.get(pants_color, [])
                    
                    for accessory in categories["accessories"]:
                        accessory_color = accessory.color.lower()
                        if accessory_color in shirt_colors and accessory_color in pants_colors:
                            outfits.append({
                                "shirt": shirt,
                                "pants": pants,
                                "accessory": accessory
                            })
        
        # Fallback to random if no matches
        if not outfits and categories["shirts"] and categories["pants"] and categories["accessories"]:
            import random
            outfits.append({
                "shirt": random.choice(categories["shirts"]),
                "pants": random.choice(categories["pants"]),
                "accessory": random.choice(categories["accessories"])
            })
        print(f"Generated {len(outfits)} outfits")
        return outfits
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))