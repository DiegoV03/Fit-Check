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
            setError("Login Failed: " + error.message);
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
