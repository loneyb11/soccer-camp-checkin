import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { QrReader } from 'react-qr-scanner';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.error("Error logging out:", error));
  };

  const handleScan = async (data) => {
    if (data) {
      try {
        const playerId = data.trim();
        const playerRef = doc(db, 'players', playerId);
        const playerSnapshot = await getDocs(collection(db, 'players'));

        // Check if the player exists
        const player = playerSnapshot.docs.find((doc) => doc.id === playerId);
        if (!player) {
          setScanResult('Player not found.');
          return;
        }

        // Toggle check-in status
        const currentStatus = player.data().checkedIn || false;
        await updateDoc(playerRef, { checkedIn: !currentStatus });
        setScanResult(`Player ${player.data().firstName} ${player.data().lastName} has been ${currentStatus ? 'checked out' : 'checked in'}.`);
      } catch (error) {
        console.error('Error updating player:', error);
        setScanResult('Error updating player. Please try again.');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setScanResult('Error accessing camera. Please check permissions.');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">QR Scanner</h2>
      
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />

      <p className="mt-4">{scanResult}</p>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => navigate("/checkin")}
      >
        Back to Check-In
      </button>
    </div>
  );
};

export default QRScanner;
