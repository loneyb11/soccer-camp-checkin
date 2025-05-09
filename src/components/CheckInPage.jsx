// src/pages/CheckInPage.jsx
import React, { useState } from 'react';
import CustomQrReader from '../components/CustomQrReader';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';


const CheckInPage = () => {
  const [data, setData] = useState('No result');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleScan = (result) => {
    if (result?.text) {
      setData(result.text);
      console.log("Scanned QR code:", result.text);
      // Handle the check-in logic here
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Check-In Page</h1>
      
      <CustomQrReader 
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result);
          }
          if (!!error) {
            handleError(error);
          }
        }}
        style={{ width: '100%' }}
      />

      <p className="mt-4 text-lg">Scanned Data: {data}</p>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default CheckInPage;
