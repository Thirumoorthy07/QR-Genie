import React, { useState } from 'react';

function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState('');
  
  const startScanner = () => {
    setScanning(true);
    // In a real implementation, you would initialize the camera here
    
    // For demo purposes, simulate a scan after 3 seconds
    setTimeout(() => {
      setScannedResult('https://example.com/scanned-result');
      setScanning(false);
    }, 3000);
  };
  
  return (
    <div className="glass-card scanner-page">
      <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Scan QR Code</h2>
      
      {!scanning && !scannedResult && (
        <button className="neon-button" onClick={startScanner}>
          Start Scanner
        </button>
      )}
      
      {scanning && (
        <div className="scanner-container">
          <div className="camera-placeholder" style={{ position: 'relative', borderRadius: '15px', overflow: 'hidden' }}>
            {/* This would be replaced with actual camera feed */}
            <div style={{ 
              width: '300px', 
              height: '300px', 
              background: 'rgba(0,0,0,0.8)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid var(--accent)',
              boxShadow: 'var(--cyan-glow)'
            }}>
              Camera Feed
            </div>
            <div className="scan-line"></div>
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '30px', 
              height: '30px', 
              borderTop: '2px solid var(--accent)', 
              borderLeft: '2px solid var(--accent)'
            }}></div>
            <div style={{ 
              position: 'absolute', 
              top: 0, 
              right: 0, 
              width: '30px', 
              height: '30px', 
              borderTop: '2px solid var(--accent)', 
              borderRight: '2px solid var(--accent)'
            }}></div>
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              width: '30px', 
              height: '30px', 
              borderBottom: '2px solid var(--accent)', 
              borderLeft: '2px solid var(--accent)'
            }}></div>
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              right: 0, 
              width: '30px', 
              height: '30px', 
              borderBottom: '2px solid var(--accent)', 
              borderRight: '2px solid var(--accent)'
            }}></div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '15px', color: 'var(--accent)' }}>Position QR code within the frame</p>
        </div>
      )}
      
      {scannedResult && (
        <div className="result-container fade-in">
          <h3 style={{ marginBottom: '15px' }}>Scanned Result:</h3>
          <div className="glass-card result-card">
            <p>{scannedResult}</p>
          </div>
          <div className="result-actions">
            <button className="neon-button" onClick={() => window.open(scannedResult)}>Open</button>
            <button className="neon-button" onClick={() => {navigator.clipboard.writeText(scannedResult)}}>Copy</button>
            <button className="neon-button" onClick={() => {setScannedResult(''); setScanning(false);}}>Scan Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRScanner; 