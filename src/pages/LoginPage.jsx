// src/pages/LoginPage.jsx
import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-config';
import "../styles/LoginPage.css";
const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
const email = result.user.email;

// Restrict to boernesoccer.org emails
if (!email.endsWith('@boernesoccer.org')) {
  alert('Only boernesoccer.org emails are allowed.');
  await auth.signOut();
} else {
  navigate('/checkin');
}
} catch (error) {
console.error(error);
alert('Failed to log in. Please try again.');
}
};

  return (
    <div className="login-container">
      <h2>Soccer Camp Check-In</h2>
      <button className="login-button" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
