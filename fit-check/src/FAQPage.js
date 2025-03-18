import React, { useState } from 'react';
import './FAQPage.css';

const FAQPage = ({ onGoHome }) => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (question) => {
        setOpenQuestion(openQuestion === question ? null : question);
    };

    return (
        <div className="faq-page">
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <div className="faq-content">
                <div className="faq-item">
                    <h2 onClick={() => toggleQuestion(1)}>What Was Our Inspiration?</h2>
                    {openQuestion === 1 && <p>Friendship.</p>}
                </div>
                <div className="faq-item">
                    <h2 onClick={() => toggleQuestion(2)}>Do We Enjoy Doing This?</h2>
                    {openQuestion === 2 && <p>Yes.</p>}
                </div>
                
            </div>
            <button className="faq-button" onClick={onGoHome}>Go to Home Screen</button>
        </div>
    );
};

export default FAQPage;