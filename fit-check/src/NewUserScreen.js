import React from 'react';
import './NewUserScreen.css';

const NewUserScreen = ({ onYes, onGoHome }) => {
    return (
        <div className="new-user-screen">
            <h1 className="new-user-title">Do you want to get started by inputting your wardrobe?</h1>
            <div className="button-container">
                <button className="new-user-button" onClick={onYes}>Yes</button>
                <button className="new-user-button" onClick={onGoHome}>Go to Home Screen</button>
            </div>
        </div>
    );
};

export default NewUserScreen;