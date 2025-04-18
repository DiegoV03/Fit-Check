import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "./SignInPage.css"; // Reuse styles from SignInPage

const SignUpPage = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
      alert("Account created successfully! Please sign in.");
      onSignIn(true);
    } catch (error) {
        let customMessage = "";

        if (error.code === "auth/weak-password") {
            customMessage += "Password must be at least 6 characters.";
        }
        else if (error.code === "auth/email-already-in-use") {
            customMessage += "This email is already registered. Please use a different email or sign in.";
        }
        else if (error.code === "auth/invalid-email") {
            customMessage += "Please enter a valid email address.";
        }
        else if (error.code === "auth/network-request-failed") {
            customMessage += "Network error. Please check your internet connection.";
        }
        else {
             setError("Sign Up Failed: " + error.message);
        }

        setError(customMessage);
    }
};

  return (
    <div className="sign-in-page">
      <h1 className="sign-in-title">Sign Up</h1>
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
        <button className="sign-in-button" onClick={handleSignUp}>Sign Up</button>
        <button className="sign-in-button" onClick={onSignIn}>Already have an account? Sign In</button>
      </div>
    </div>
  );
};

export default SignUpPage;
