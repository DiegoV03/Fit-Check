import React, { useState } from 'react';
import './ManualClothingAdder.css';

const ManualClothingAdder = ({ onGoBack }) => {
    const [clothingType, setClothingType] = useState('');
    const [color, setColor] = useState('');
    const [fabric, setFabric] = useState('');
    const [size, setSize] = useState('');
    const [length, setLength] = useState('');
    const [message, setMessage] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("You must be logged in to add clothing.");
            return;
        }

        const clothingData = {
            name: `${clothingType} - ${color}`,
            color: color,
            category: clothingType,
            fabric: fabric,
            size: size,
            length: length,
            description: description,
            image_url: imageUrl
        };

        console.log("📦 Sending clothing to backend:", clothingData);

        try {
            const response = await fetch("http://127.0.0.1:8000/clothes/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(clothingData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to add clothing:", errorData);
                alert("Failed to add clothing: " + (errorData.detail || JSON.stringify(errorData)));
                return;
            }

            const result = await response.json();
            console.log("Clothing added:", result);
            setMessage("Clothing added successfully!");

            // Clear form fields
            setClothingType('');
            setColor('');
            setFabric('');
            setSize('');
            setLength('');
        } catch (error) {
            console.error("Error while adding clothing:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="manual-clothing-adder">
            <button className="back-button" onClick={onGoBack}>
                Back to Link Adder
            </button>
            <h1 className="title">Enter Clothing Details</h1>

            <div className="form-group">
                <label>Clothing Type:</label>
                <div className="checkbox-group">
                    {["Shirt", "Accessory", "Pants", "Outerwear", "Other"].map(type => (
                        <label key={type}>
                            <input
                                type="radio"
                                name="clothingType"
                                value={type}
                                checked={clothingType === type}
                                onChange={(e) => setClothingType(e.target.value)}
                            />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Color:</label>
                <input
                    type="text"
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Fabric:</label>
                <input
                    type="text"
                    placeholder="Enter fabric"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Size:</label>
                <input
                    type="text"
                    placeholder="Enter size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Length:</label>
                <input
                    type="text"
                    placeholder="Enter length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Image URL:</label>
                <input
                    type="text"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>

            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>

            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default ManualClothingAdder;
