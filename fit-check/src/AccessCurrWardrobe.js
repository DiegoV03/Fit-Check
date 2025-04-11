<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import "./AccessCurrWardrobe.css";

const AccessCurrWardrobe = ({ onGoBack }) => {
    const [clothes, setClothes] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        color: '',
        category: '',
        fabric: '',
        size: '',
        length: ''
    });

    useEffect(() => {
        fetchClothes();
    }, []);

    const fetchClothes = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await fetch("http://127.0.0.1:8000/clothes/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setClothes(data);
        } catch (error) {
            console.error("Failed to load clothes:", error);
        }
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/clothes/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete item");
            }

            setClothes(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setEditForm({
            name: item.name,
            color: item.color,
            category: item.category,
            fabric: item.fabric,
            size: item.size,
            length: item.length
        });
    };

    const handleEditSubmit = async () => {
        const token = localStorage.getItem("access_token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/clothes/${editingItem.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editForm)
            });

            if (!response.ok) {
                throw new Error("Update failed");
            }

            alert("Item updated successfully");
            setEditingItem(null);
            fetchClothes(); // refresh data
        } catch (error) {
            alert("Failed to update item");
            console.error(error);
        }
    };

    const renderCategory = (categoryName) => {
        const categoryItems = clothes.filter(item => item.category === categoryName);

        return (
            <div className="wardrobe-section" key={categoryName}>
                <h2>{categoryName}</h2>
                <div className="scrollable">
                    {categoryItems.length === 0 ? (
                        <p>No {categoryName.toLowerCase()} yet</p>
                    ) : (
                        categoryItems.map(item => (
                            <div key={item.id} className="item-row">
                                <span>
                                    {item.name}
                                    {item.fabric || item.size || item.length ? (
                                        <> ({[item.fabric, item.size, item.length].filter(Boolean).join(", ")})</>
                                    ) : null}
                                </span>
                                <button className="edit-btn" onClick={() => handleEditClick(item)}>✏️</button>
                                <button className="delete-btn" onClick={() => handleDelete(item.id)}>❌</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    };

=======
import React from 'react';
import './AccessCurrWardrobe.css';

const AccessCurrWardrobe = ({ onGoBack }) => {
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
    return (
        <div className="access-curr-wardrobe">
            <button className="back-button" onClick={onGoBack}>
                Back to Landing
            </button>
            <h1 className="title">Current Wardrobe</h1>
<<<<<<< HEAD

            {editingItem && (
                <div className="edit-form">
                    <h3>Editing: {editingItem.name}</h3>
                    {["name", "color", "category", "fabric", "size", "length"].map((field) => (
                        <input
                            key={field}
                            type="text"
                            placeholder={field}
                            value={editForm[field]}
                            onChange={(e) =>
                                setEditForm((prev) => ({ ...prev, [field]: e.target.value }))
                            }
                        />
                    ))}
                    <div style={{ marginTop: "10px" }}>
                        <button onClick={handleEditSubmit}>💾 Save</button>
                        <button onClick={() => setEditingItem(null)} style={{ marginLeft: "10px" }}>Cancel</button>
                    </div>
                </div>
            )}

            <div className="wardrobe-sections">
                {["Shirt", "Pants", "Accessory", "Outerwear", "Other"].map(category =>
                    renderCategory(category)
                )}
=======
            <div className="wardrobe-sections">
                <div className="wardrobe-section">
                    <h2>Shirts</h2>
                    <div className="scrollable">
                        <p>Shirt 1</p>
                        <p>Shirt 2</p>
                        <p>Shirt 3</p>
                    </div>
                </div>
                <div className="wardrobe-section">
                    <h2>Pants</h2>
                    <div className="scrollable">
                        <p>Pants 1</p>
                        <p>Pants 2</p>
                        <p>Pants 3</p>
                    </div>
                </div>
                <div className="wardrobe-section">
                    <h2>Accessories</h2>
                    <div className="scrollable">
                        <p>Accessory 1</p>
                        <p>Accessory 2</p>
                        <p>Accessory 3</p>
                    </div>
                </div>
                <div className="wardrobe-section">
                    <h2>Outerwear</h2>
                    <div className="scrollable">
                        <p>Outerwear 1</p>
                        <p>Outerwear 2</p>
                        <p>Outerwear 3</p>
                    </div>
                </div>
>>>>>>> a3fca22f768d92ae1b1a6a842c3040e682c55dd3
            </div>
        </div>
    );
};

export default AccessCurrWardrobe;