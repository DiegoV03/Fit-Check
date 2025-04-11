from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

@app.route('/api/recommend-outfits', methods=['POST'])
def recommend_outfits():
    try:
        clothing_items = request.json.get('clothing_items', [])
        
        categories = {
            "tops": [item for item in clothing_items if item['category'] == "top"],
            "bottoms": [item for item in clothing_items if item['category'] == "bottom"],
            "shoes": [item for item in clothing_items if item['category'] == "shoe"]
        }
        
        outfits = []
        
        for top in categories["tops"]:
            main_color = top['color'].lower()
            complementary_colors = COLOR_THEORY.get(main_color, [])
            
            for bottom in categories["bottoms"]:
                if bottom['color'].lower() in complementary_colors:
                    bottom_color = bottom['color'].lower()
                    top_colors = COLOR_THEORY.get(main_color, [])
                    bottom_colors = COLOR_THEORY.get(bottom_color, [])
                    
                    for shoe in categories["shoes"]:
                        shoe_color = shoe['color'].lower()
                        if shoe_color in top_colors and shoe_color in bottom_colors:
                            outfits.append({
                                "top": top,
                                "bottom": bottom,
                                "shoe": shoe
                            })
        
        # Fallback to random if no matches
        if not outfits and categories["tops"] and categories["bottoms"] and categories["shoes"]:
            import random
            outfits.append({
                "top": random.choice(categories["tops"]),
                "bottom": random.choice(categories["bottoms"]),
                "shoe": random.choice(categories["shoes"])
            })
        
        return jsonify({"outfits": outfits if outfits else []})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)