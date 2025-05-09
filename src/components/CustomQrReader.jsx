import React from 'react';
import QrScanner from 'react-qr-scanner';

const CustomQrReader = ({ delay = 300, onScan = () => {}, onError = () => {} }) => {

  return (
   
      <QrScanner
        delay={delay}
        onScan={onScan}
        onError={onError}
        style={{ width: "100%" }}
      />
    
  );
};

export default CustomQrReader;