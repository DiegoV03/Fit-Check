import React from 'react';
import './OutfitSelector.css';

const OutfitSelector = ({ onRemakeFit, onGoBack }) => {
    return (
        <div className="outfit-selector">
            <button className="back-button" onClick={onGoBack}>
                Back to Landing
            </button>
            <h1 className="title">Outfit Selector</h1>
            <div className="selection-container">
                <div className="selection-item">
                    <img src="https://via.placeholder.com/150" alt="Shirt selection" />
                    <p>Shirt Selection</p>
                </div>
                <div className="selection-item">
                    <img src="https://via.placeholder.com/150" alt="Pant selection" />
                    <p>Pant Selection</p>
                </div>
                <div className="selection-item">
                    <img src="https://via.placeholder.com/150" alt="Accessory selection" />
                    <p>Accessory Selection</p>
                </div>
                <div className="selection-item">
                    <img src="https://via.placeholder.com/150" alt="Outerwear selection" />
                    <p>Outerwear Selection</p>
                </div>
            </div>
            <button className="remake-button" onClick={onRemakeFit}>
                Unsatisfied? Click to Remake Fit
            </button>
        </div>
    );
};

export default OutfitSelector;