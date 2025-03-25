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
      //  Step 1: Register with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Firebase user created:", userCredential.user);

      //  Step 2: Send user data to FastAPI backend
      const body = {
        username: email.split("@")[0],
        email: email,
        password: password
      };
      console.log("Sending data to FastAPI:", body);

      const response = await fetch("http://127.0.0.1:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend registration failed:", errorData);
        alert("Backend registration failed: " + (errorData.detail || JSON.stringify(errorData)));
        return;
      }

      alert(" Account created successfully! Please sign in.");
      onSignIn(true);

    } catch (error) {
      console.error("Registration error:", error);

      let customMessage = "";

      if (error.code === "auth/weak-password") {
        customMessage = "Password must be at least 6 characters.";
      } else if (error.code === "auth/email-already-in-use") {
        customMessage = "This email is already registered. Please use a different email or sign in.";
      } else if (error.code === "auth/invalid-email") {
        customMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/network-request-failed") {
        customMessage = "Network error. Please check your internet connection.";
      } else {
        customMessage = "Sign Up Failed: " + error.message;
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