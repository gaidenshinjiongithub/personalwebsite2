import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/account');
  };

  return (
    <div>
      <div className="mobile-nav">
        <div className="mobile-nav-header">
          <Link to="/" className="navbar-logo">MoonDev</Link>
          <button className="icon" onClick={toggleMobileMenu}>
          <h6 style={{ color: 'black' }}><b>☰</b></h6>
          </button>
        </div>

        <div id="mobileLinks" className={mobileMenuOpen ? 'open' : ''}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          {isLoggedIn && (
            <Link to="/account" onClick={() => setMobileMenuOpen(false)}>Account</Link>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            </>
          )}
          {isLoggedIn && (
            <Link to="#" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileMenuOpen(false); }}>
              Logout
            </Link>
          )}
        </div>
      </div>

      
      <div className="navbar">
        <Link to="/" className="navbar-logo"><b>MoonDev</b></Link>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        {isLoggedIn && (
          <Link to="/account">Account</Link>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <button onClick={handleLogin}>Login</button>
            </Link>
            <Link to="/signup">
              <button>Get Started</button>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
