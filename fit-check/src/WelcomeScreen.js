import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onGetStarted }) => {
    return (
        <div className="welcome-screen">
            <h1 className="welcome-title">FitCheck</h1>
            <button className="welcome-button" onClick={onGetStarted}>Get Started</button>
        </div>
    );
};

export default WelcomeScreen;