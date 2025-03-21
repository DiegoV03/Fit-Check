import React, { useState } from "react";
import "./SignInPage.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const SignInPage = ({ onNewUser, onReturningUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login Successful!");
            onReturningUser();  // Navigate to the next step
        } catch (error) {
            let customMessage = "Login Failed: wrong password";  
    
            if (error.code === "auth/wrong-password") {
                customMessage += "Incorrect password. Please try again.";
            } else if (error.code === "auth/user-not-found") {
                customMessage += "No account found with this email. Please check your email or sign up.";
            } else if (error.code === "auth/invalid-email") {
                customMessage += "Please enter a valid email address.";
            } else if (error.code === "auth/too-many-requests") {
                customMessage += "Too many failed login attempts. Please try again later or reset your password.";
            } else if (error.code === "auth/network-request-failed") {
                customMessage += "Network error. Please check your internet connection.";
            } else {
                setError("Login Failed: " + "Incorrect password. Please try again.");;
            }
    
            setError(customMessage);
        }
    };

    return (
        <div className="sign-in-page">
            <h1 className="sign-in-title">Sign In</h1>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="sign-in-input"
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="sign-in-input"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="button-container">
                <button className="sign-in-button" onClick={handleLogin}>Login</button>
                <button className="sign-in-button" onClick={onNewUser}>New User? Sign Up</button>
            </div>
        </div>
    );
};

export default SignInPage;
