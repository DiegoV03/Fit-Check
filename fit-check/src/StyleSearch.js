// src/StyleSearch.js
import React, { useState, useEffect } from 'react';
import './StyleSearch.css';

const StyleSearch = ({ onGoBack }) => {
  const [outfits, setOutfits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOutfits = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mockClothingItems = [
        { id: 1, name: "Red T-Shirt", color: "red", category: "top" },
        { id: 2, name: "Blue Button-Up", color: "blue", category: "top" },
        { id: 3, name: "White Blouse", color: "white", category: "top" },
        { id: 4, name: "Black Tank Top", color: "black", category: "top" },
        { id: 7, name: "Blue Jeans", color: "blue", category: "bottom" },
        { id: 8, name: "Black Slacks", color: "black", category: "bottom" },
        { id: 9, name: "White Shorts", color: "white", category: "bottom" },
        { id: 10, name: "Beige Chinos", color: "beige", category: "bottom" },
        { id: 13, name: "White Sneakers", color: "white", category: "shoe" },
        { id: 14, name: "Black Boots", color: "black", category: "shoe" },
        { id: 15, name: "Brown Loafers", color: "brown", category: "shoe" },
        { id: 16, name: "Red High Tops", color: "red", category: "shoe" }
      ];

      const response = await fetch('http://localhost:8000/api/recommend-outfits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clothing_items: mockClothingItems
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setOutfits(data.outfits || data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching outfits:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, []);

  return (
    <div className="style-search-page">
      <div className="header-container">
        <button className="back-button" onClick={onGoBack}>
          ← Back to Home
        </button>
        <h1>Style Recommendations</h1>
      </div>

      {isLoading && <p>Loading recommendations...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="outfits-container">
        {outfits.length > 0 ? (
          outfits.map((outfit, index) => (
            <div key={index} className="outfit-card">
              <h3>Outfit #{index + 1}</h3>
              <div className="outfit-piece">
                <strong>Top:</strong> {outfit.top?.name || outfit.shirt?.name} ({outfit.top?.color || outfit.shirt?.color})
              </div>
              <div className="outfit-piece">
                <strong>Bottom:</strong> {outfit.bottom?.name || outfit.pants?.name} ({outfit.bottom?.color || outfit.pants?.color})
              </div>
              <div className="outfit-piece">
                <strong>Shoes:</strong> {outfit.shoe?.name || outfit.accessory?.name} ({outfit.shoe?.color || outfit.accessory?.color})
              </div>
            </div>
          ))
        ) : (
          !isLoading && <p>No outfits could be generated with your current wardrobe.</p>
        )}
      </div>

      <button
        className="generate-btn"
        onClick={fetchOutfits}
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate New Outfits'}
      </button>
    </div>
  );
};

export default StyleSearch;
