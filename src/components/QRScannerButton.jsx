import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const QRScanner = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  // Basic logout button here as well
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">QR Scanner</h2>
      <p>QR Scanner functionality coming soon...</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default QRScanner;
