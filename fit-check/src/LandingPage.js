import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onFAQ }) => {
    return (
        <div className="landing-page">
            <header className="landing-page-header">
                <nav className="top-right-nav">
                    <a href="#account">Account</a>
                    <a href="#settings">Settings</a>
                    <a href="#faq" onClick={onFAQ}>FAQ</a>
                </nav>
                <h1>Welcome to Fit Check</h1>
                <p>It Fits! We Checked!</p>
                <div className="button-container">
                    <button>Access Current Wardrobe</button>
                    <button>Choose an Outfit</button>
                    <button>Add To Wardrobe</button>
                    <button>Search For New Styles</button>
                </div>
            </header>
        </div>
    );
};

export default LandingPage;