import React from 'react';
import './WelcomeBackScreen.css';

const WelcomeBackScreen = ({ onGoHome }) => {
    return (
        <div className="welcome-back-screen">
            <h1 className="welcome-back-title">Welcome Back!</h1>
            <input type="email" className="welcome-back-input" placeholder="Enter your email" />
            <input type="password" className="welcome-back-input" placeholder="Enter your password" />
            <button className="welcome-back-button" onClick={onGoHome}>Log In</button>
        </div>
    );
};

export default WelcomeBackScreen;