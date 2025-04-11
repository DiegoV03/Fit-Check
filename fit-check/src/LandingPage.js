import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onFAQ, onAccount, onAddClothing, onAccessWardrobe, onChooseOutfit, onSearchStyles }) => {
    return (
        <div className="landing-page">
            <header className="landing-page-header">
                <nav className="top-right-nav">
                    <a href="#account" onClick={(e) => { e.preventDefault(); onAccount(); }}>Account</a>
                    <a href="#settings">Settings</a>
                    <a href="#faq" onClick={(e) => { e.preventDefault(); onFAQ(); }}>FAQ</a>
                </nav>
                <h1>Welcome to Fit Check</h1>
                <p>It Fits! We Checked!</p>
                <div className="button-container">
                    <button onClick={onAccessWardrobe}>Access Current Wardrobe</button>
                    <button onClick={onChooseOutfit}>Choose an Outfit</button>
                    <button onClick={onAddClothing}>Add To Wardrobe</button>
                    <button onClick={onSearchStyles}>Search For New Styles</button>
                </div>
            </header>
        </div>
    );
};

export default LandingPage;