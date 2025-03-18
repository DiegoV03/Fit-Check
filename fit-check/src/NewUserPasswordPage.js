import React from 'react';
import './NewUserPasswordPage.css';

const NewUserPasswordPage = ({ onPasswordSubmit }) => {
    return (
        <div className="new-user-password-page">
            <h1 className="new-user-password-title">Choose a Password</h1>
            <input type="password" className="new-user-password-input" placeholder="Create Password" />
            <input type="password" className="new-user-password-input" placeholder="Confirm Password" />
            <button className="new-user-password-submit-button" onClick={onPasswordSubmit}>Submit</button>
        </div>
    );
};

export default NewUserPasswordPage;