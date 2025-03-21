import React, { useState } from 'react';
import './LinkClothingAdder.css';

const LinkClothingAdder = ({ onEnterManually, onGoBack }) => {
    const [link, setLink] = useState('');

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = () => {
        if (link) {
            console.log('Clothing link submitted:', link);
            // Add logic to handle the submitted link
        } else {
            alert('Please enter a link.');
        }
    };

    return (
        <div className="link-clothing-adder">
            <button className="back-button" onClick={onGoBack}>
                Back to Landing
            </button>
            <h1 className="title">Enter a clothing link to Add item</h1>
            <input
                type="text"
                placeholder="Enter clothing link here"
                value={link}
                onChange={handleLinkChange}
                className="link-input"
            />
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
            <p className="no-link-text">Don't have a link?</p>
            <button className="manual-button" onClick={onEnterManually}>
              Enter Manually
            </button>
        </div>
    );
};

export default LinkClothingAdder;