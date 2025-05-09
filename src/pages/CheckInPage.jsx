// src/pages/CheckInPage.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import CustomQrReader from '../components/CustomQrReader';

const CheckInPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrMode, setQrMode] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playerSnapshot = await getDocs(collection(db, 'players'));
        const playerData = playerSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlayers(playerData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const toggleCheckIn = async (playerId, currentlyCheckedIn) => {
    const playerRef = doc(db, 'players', playerId);
    await updateDoc(playerRef, {
      checkedIn: !currentlyCheckedIn,
    });

    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, checkedIn: !currentlyCheckedIn }
          : player
      )
    );
  };

  const handleScan = (data) => {
    try {
      if (data && typeof data === 'string') {
        const playerId = data.trim();
        console.log("Scanned Player ID:", playerId);
        
        // Handle the player check-in or check-out
      }
    } catch (error) {
      console.error("Error parsing QR code:", error);
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
    alert("Error scanning QR code. Please try again.");
  };

  if (loading) return <p className="text-center text-gray-600">Loading players...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Player Check-In</h2>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setQrMode(!qrMode)}
          className="px-5 py-2 rounded bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200"
        >
          {qrMode ? "Close QR Scanner" : "Open QR Scanner"}
        </button>
      </div>

      {qrMode && (
        <div className="mb-6 flex justify-center">
          <CustomQrReader onScan={handleScan} onError={handleError} />
        </div>
      )}

      <ul className="space-y-4">
        {players.map(player => (
          <li
            key={player.id}
            className="flex justify-between items-center p-4 bg-white shadow rounded-lg"
          >
            <span className="text-lg font-medium text-gray-800">
              {player.firstName} {player.lastName}
            </span>
            <button
              onClick={() => toggleCheckIn(player.id, player.checkedIn)}
              className={`px-5 py-2 rounded font-semibold shadow-md transition-all duration-200 ${
                player.checkedIn
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {player.checkedIn ? "Check Out" : "Check In"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckInPage;