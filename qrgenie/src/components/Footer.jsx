import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content glass-card">
          <div className="footer-logo">
            <span className="logo-text">QR Genie</span>
          </div>
          <div className="footer-links">
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
          <div className="footer-copyright">
            <p>Powered by <span className="accent-text">Stark Cloudie</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 