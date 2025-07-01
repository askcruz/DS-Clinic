import React, { useState, useEffect } from 'react';
import Logo2Black from '../Assets/logos/logo2black.png';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';


const navMap = {
  Home: '/',
  About: '/aboutus',
  Services: '/services',
  Booking: '/booking',
  Contacts: '/contact',
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = Object.keys(navMap);

  const handleNavClick = (item) => {
    const path = navMap[item];
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-bottom'}`}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src={Logo2Black} alt="DS Clinic Logo" className="logo2black" />
          </div>
          <div className="navbar-items">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className={`navbar-item ${item === 'Book Now'
                  ? `navbar-book-btn ${isScrolled ? 'navbar-book-btn-scrolled' : 'navbar-book-btn-bottom'}`
                  : isScrolled ? 'navbar-item-scrolled' : 'navbar-item-bottom'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;