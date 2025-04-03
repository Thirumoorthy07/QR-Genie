import React, { useState } from 'react';
import QRCode from 'qrcode.react';

function QRGenerator() {
  const [url, setUrl] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const generateQR = () => {
    if (!url) return;
    
    setLoading(true);
    
    // Simulate loading for demo purposes
    setTimeout(() => {
      setQrGenerated(true);
      setLoading(false);
    }, 800);
  };
  
  const handleInputChange = (e) => {
    setUrl(e.target.value);
    if (qrGenerated) {
      setQrGenerated(false);
    }
  };
  
  return (
    <div className="glass-card qr-generator">
      <h2 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Generate Your QR Instantly!</h2>
      
      <div className="input-group">
        <input
          type="text"
          className="neon-input"
          placeholder="Enter URL or text..."
          value={url}
          onChange={handleInputChange}
        />
        <button className="neon-button" onClick={generateQR}>
          Generate
        </button>
      </div>
      
      {loading && (
        <div className="loading-container" style={{ textAlign: 'center', marginTop: '30px' }}>
          <i className="fas fa-qrcode loading-qr" style={{ fontSize: '3rem' }}></i>
          <p style={{ marginTop: '10px' }}>Creating your QR code...</p>
        </div>
      )}
      
      {qrGenerated && !loading && (
        <div className="qr-container fade-in">
          <QRCode 
            value={url || 'https://example.com'} 
            size={250}
            level="H" 
            includeMargin={true}
            bgColor={'transparent'}
            fgColor={'var(--primary)'}
          />
          <div className="qr-actions">
            <button className="neon-button">Download</button>
            <button className="neon-button">Share</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRGenerator; 