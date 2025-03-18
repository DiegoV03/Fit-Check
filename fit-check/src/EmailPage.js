import React from 'react';
import './EmailPage.css';

const EmailPage = ({ onEmailSubmit }) => {
    return (
        <div className="email-page">
            <h1 className="email-title">Hello! Enter your email</h1>
            <input type="email" className="email-input" placeholder="Enter your email" />
            <button className="email-submit-button" onClick={onEmailSubmit}>Submit</button>
        </div>
    );
};

export default EmailPage;