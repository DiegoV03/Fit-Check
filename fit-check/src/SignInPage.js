import React from 'react';
import './SignInPage.css';

const SignInPage = ({ onNewUser, onReturningUser }) => {
    return (
        <div className="sign-in-page">
            <h1 className="sign-in-title">Sign In</h1>
            <div className="button-container">
                <button className="sign-in-button" onClick={onNewUser}>New User</button>
                <button className="sign-in-button" onClick={onReturningUser}>Returning User</button>
            </div>
        </div>
    );
};

export default SignInPage;