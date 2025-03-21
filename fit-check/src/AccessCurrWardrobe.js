import React from 'react';
import './AccessCurrWardrobe.css';

const AccessCurrWardrobe = ({ onGoBack }) => {
    return (
        <div className="access-curr-wardrobe">
            <button className="back-button" onClick={onGoBack}>
                Back to Landing
            </button>
            <h1 className="title">Current Wardrobe</h1>
            <div className="wardrobe-sections">
                <div className="wardrobe-section">
                    <h2>Shirts</h2>
                    <div className="scrollable">
                        <p>Shirt 1</p>
                        <p>Shirt 2</p>
                        <p>Shirt 3</p>
                    </div>
                </div>
                <div className="wardrobe-section">
                    <h2>Pants</h2>
                    <div className="scrollable">
                        <p>Pants 1</p>
                        <p>Pants 2</p>
                        <p>Pants 3</p>
                    </div>
                </div>
                <div className="wardrobe-section">
                    <h2>Accessories</h2>
                    <div className="scrollable">
                        <p>Accessory 1</p>
                        <p>Accessory 2</p>
                        <p>Accessory 3</p>
                    </div>
                </div>
                <div className="wardrobe-section">
                    <h2>Outerwear</h2>
                    <div className="scrollable">
                        <p>Outerwear 1</p>
                        <p>Outerwear 2</p>
                        <p>Outerwear 3</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessCurrWardrobe;