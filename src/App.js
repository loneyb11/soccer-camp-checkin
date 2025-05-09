import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CheckInPage from './pages/CheckInPage';
import QRScanner from './pages/QRScanner';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';

const auth = getAuth();

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkin" element={user ? <CheckInPage /> : <Navigate to="/login" replace />} />
        <Route path="/scan" element={user ? <QRScanner /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={user ? "/checkin" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
