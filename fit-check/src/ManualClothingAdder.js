import React, { useState } from 'react';
import './ManualClothingAdder.css';

const ManualClothingAdder = ({ onGoBack }) => {
    const [clothingType, setClothingType] = useState('');
    const [color, setColor] = useState('');
    const [fabric, setFabric] = useState('');
    const [size, setSize] = useState('');
    const [length, setLength] = useState('');
<<<<<<< HEAD
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("You must be logged in to add clothing.");
            return;
        }

        const clothingData = {
            name: `${clothingType} - ${color}`, // auto-generated name
            color: color,
            category: clothingType,
            fabric: fabric,
            size: size,
            length: length
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
=======

    const handleSubmit = () => {
        console.log('Clothing Details:', {
            clothingType,
            color,
            fabric,
            size,
            length,
        });
        // Add logic to handle the submitted data
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
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
<<<<<<< HEAD
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

=======
                    <label>
                        <input
                            type="radio"
                            name="clothingType"
                            value="Shirt"
                            onChange={(e) => setClothingType(e.target.value)}
                        />
                        Shirt
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="clothingType"
                            value="Accessory"
                            onChange={(e) => setClothingType(e.target.value)}
                        />
                        Accessory
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="clothingType"
                            value="Pants"
                            onChange={(e) => setClothingType(e.target.value)}
                        />
                        Pants
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="clothingType"
                            value="Outerwear"
                            onChange={(e) => setClothingType(e.target.value)}
                        />
                        Outerwear
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="clothingType"
                            value="Other"
                            onChange={(e) => setClothingType(e.target.value)}
                        />
                        Other
                    </label>
                </div>
            </div>
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
            <div className="form-group">
                <label>Color:</label>
                <input
                    type="text"
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
<<<<<<< HEAD

=======
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
            <div className="form-group">
                <label>Fabric:</label>
                <input
                    type="text"
                    placeholder="Enter fabric"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                />
            </div>
<<<<<<< HEAD

=======
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
            <div className="form-group">
                <label>Size:</label>
                <input
                    type="text"
                    placeholder="Enter size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
            </div>
<<<<<<< HEAD

=======
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
            <div className="form-group">
                <label>Length:</label>
                <input
                    type="text"
                    placeholder="Enter length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
            </div>
<<<<<<< HEAD

            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>

            {message && <p className="success-message">{message}</p>}
=======
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
        </div>
    );
};

export default ManualClothingAdder;