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
      const response = await fetch('http://localhost:8000/api/recommend-outfits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No authentication headers needed
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setOutfits(data);
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
                <strong>Shirt:</strong> {outfit.shirt.name} ({outfit.shirt.color})
              </div>
              <div className="outfit-piece">
                <strong>Pants:</strong> {outfit.pants.name} ({outfit.pants.color})
              </div>
              <div className="outfit-piece">
                <strong>Accessory:</strong> {outfit.accessory.name} ({outfit.accessory.color})
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