import React, { useState } from 'react';
import './LinkClothingAdder.css';

const LinkClothingAdder = ({ onEnterManually, onGoBack }) => {
    const [link, setLink] = useState('');
    const [scrapedItem, setScrapedItem] = useState(null);

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = async () => {
        if (!link) {
            alert('Please enter a link.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/scrape_zara/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: link }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch scraped data');
            }

            const data = await response.json();
            console.log('Scraped result:', data);
            setScrapedItem(data);
        } catch (error) {
            console.error('Error during scraping:', error);
            alert('Scraping failed, please check the link.');
        }
    };

    const handleAddToWardrobe = () => {
        console.log('Send to wardrobe backend:', scrapedItem);
        // 可选：发送 POST 请求保存到数据库
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

            {scrapedItem && (
                <div className="preview-card">
                    <h2>Preview</h2>
                    {scrapedItem.image_url && (
                        <img
                            src={scrapedItem.image_url}
                            alt={scrapedItem.name}
                            className="preview-image"
                        />
                    )}
                    <p><strong>Name:</strong> {scrapedItem.name}</p>
                    <p><strong>Price:</strong> {scrapedItem.price}</p>
                    <p><strong>Color:</strong> {scrapedItem.color}</p>
                    <p><strong>Description:</strong> {scrapedItem.description}</p>
                    <button className="add-button" onClick={handleAddToWardrobe}>
                        Add to Wardrobe
                    </button>
                </div>
            )}
        </div>
    );
};

export default LinkClothingAdder;
