import React from 'react';
import './WelcomeBackScreen.css';

const WelcomeBackScreen = ({ onGoHome }) => {
    return (
        <div className="welcome-back-screen">
            <h1 className="welcome-back-title">Welcome Back!</h1>
            <button className="welcome-back-button" onClick={onGoHome}>Start Fitting!</button>
        </div>
    );
};

export default WelcomeBackScreen;
