import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, X, Scan, QrCode, History } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import QRScanner from './components/QRScanner';
import QRHistory from './components/QRHistory';
import Footer from './components/Footer';
import './index.css';
import './neonTechTheme.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Apply theme class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <nav className="sticky top-0 w-full backdrop-blur-md z-50 border-b border-opacity-20" 
          style={{ 
            background: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(245, 245, 245, 0.8)', 
            borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' 
          }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold neon-header">QR Genie</h1>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
              </div>
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-white"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden glass-card mt-1 mx-2 py-3">
              <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isMobile={true} />
            </div>
          )}
        </nav>
        <main className="flex-grow pt-6 pb-6 px-3 md:px-4 md:pt-8 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/generate" element={<Navigate to="/" replace />} />
              <Route path="/scan" element={
                <div className="max-w-3xl mx-auto">
                  <QRScanner />
                </div>
              } />
              <Route path="/history" element={
                <div className="max-w-4xl mx-auto">
                  <QRHistory />
                </div>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </main>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;