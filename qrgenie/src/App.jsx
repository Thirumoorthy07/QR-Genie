import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/neonTechTheme.css';
import './styles/layout.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QRGenerator from './components/QRGenerator';
import QRScanner from './components/QRScanner';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  
  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  // Apply theme class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);
  
  return (
    <Router>
      <div className="app">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main className="container">
          <Routes>
            <Route path="/" element={<QRGenerator />} />
            <Route path="/generate" element={<QRGenerator />} />
            <Route path="/scan" element={<QRScanner />} />
            <Route path="/history" element={<div className="glass-card"><h2>History (Coming Soon)</h2></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 