import React from 'react';

interface FooterProps {
  isDarkMode?: boolean;
}

function Footer({ isDarkMode = true }: FooterProps) {
  // Use inline styles for critical colors to ensure visibility
  const textStyle = {
    color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
    fontWeight: 'normal',
    fontSize: '0.95rem'
  };

  // Add responsive classes that will respond to the media queries in CSS
  const footerClass = "w-full backdrop-blur-md border-t border-opacity-20 py-3";
  
  return (
    <footer className={footerClass}
      style={{ 
        background: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(245, 245, 245, 0.8)', 
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' 
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p style={textStyle}>
          Powered by{' '}
          <a
            href="https://starkcloudie.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-accent font-semibold"
            style={{ letterSpacing: '0.3px' }}
          >
            Stark Cloudie
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;