import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            <span className="logo-text">QR Genie</span>
          </Link>
          
          <div className="nav-links">
            <Link to="/generate" className="nav-link">Generate</Link>
            <Link to="/scan" className="nav-link">Scan</Link>
            <Link to="/history" className="nav-link">History</Link>
            
            <div className="theme-toggle" onClick={toggleTheme}>
              <div className="toggle-thumb"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 