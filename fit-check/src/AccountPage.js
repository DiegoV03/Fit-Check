import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Import Firebase authentication
import './AccountPage.css';

const AccountPage = ({ onGoHome }) => {
    // Example user data
    const userData = {
        username: 'JohnDoe',
        birthday: '1990-01-01',
        profileImage: 'https://via.placeholder.com/150', // Replace with actual image URL.
    };

    // ✅ Logout Function
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("You have been logged out!");
            window.location.reload(); // Reload the page to reset authentication state
        } catch (error) {
            alert("Logout Failed: " + error.message);
        }
    };

    return (
        <div className="account-page">
            <h1 className="account-title">Account Information</h1>
            <div className="account-details">
                <div className="account-item">
                    <strong>Username:</strong> {userData.username}
                </div>
                <div className="account-item">
                    <strong>Birthday:</strong> {userData.birthday}
                </div>
                <div className="account-item">
                    <strong>Profile Image:</strong>
                    <div>
                        <img
                            src={userData.profileImage}
                            alt="Profile"
                            className="profile-image"
                        />
                    </div>
                </div>
            </div>
            <button className="account-button" onClick={onGoHome}>
                Go to Home Screen
            </button>
            <button className="account-button logout-button" onClick={handleLogout}>
                Log Out
            </button>
        </div>
    );
};

export default AccountPage;
