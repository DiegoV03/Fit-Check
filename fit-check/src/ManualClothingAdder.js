import React, { useState } from 'react';
import './ManualClothingAdder.css';

const ManualClothingAdder = ({ onGoBack }) => {
    const [clothingType, setClothingType] = useState('');
    const [color, setColor] = useState('');
    const [fabric, setFabric] = useState('');
    const [size, setSize] = useState('');
    const [length, setLength] = useState('');

    const handleSubmit = () => {
        console.log('Clothing Details:', {
            clothingType,
            color,
            fabric,
            size,
            length,
        });
        // Add logic to handle the submitted data
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
            <button className="submit-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default ManualClothingAdder;