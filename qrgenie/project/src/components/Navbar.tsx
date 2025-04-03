import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Scan, History, Home, Info, Briefcase, Mail } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isMobile?: boolean;
}

function Navbar({ isDarkMode, toggleDarkMode, isMobile = false }: NavbarProps) {
  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/scan', label: 'Scan', icon: <Scan size={18} /> },
    { path: '/history', label: 'History', icon: <History size={18} /> },
    { path: '/about', label: 'About', icon: <Info size={18} /> },
    { path: '/projects', label: 'Our Other Projects', icon: <Briefcase size={18} /> },
    { path: '/contact', label: 'Contact Us', icon: <Mail size={18} /> },
  ];

  return (
    <div className={isMobile ? 'flex flex-col space-y-3 px-4' : 'flex items-center space-x-6'}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-link flex items-center gap-2 ${isActive ? 'text-primary font-semibold' : ''}`
          }
          style={{ color: isDarkMode ? 'white' : '#333333' }}
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
      
      <div className="theme-toggle" onClick={toggleDarkMode}>
        <div className={`toggle-thumb ${!isDarkMode ? 'light-mode' : ''}`}></div>
      </div>
    </div>
  );
}

export default Navbar;