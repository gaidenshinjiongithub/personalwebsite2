import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  const handleMenuToggle = () => {
    const mobileLinks = document.getElementById('mobileLinks');
    if (mobileLinks) {
      mobileLinks.classList.toggle('show');
    }
  };

  return (
    <>
    
    <Navbar></Navbar>

      <div className="hero-container">
        <div className="hero-cta"></div>
        <div className="hero-t">
          <h1>A professional web developer, at your service...</h1>
        </div>

        <div className="profile-hero-img">
          <img src="public/VT Photo(1).jpg" alt="Feature-hero" width="625" height="500" />
        </div>

        <div className="hero-p">
          <p>
            I am Daron DuBose, a skilled web developer specializing in creating clean, modern, and high-performing websites tailored to your needs. Whether you need a sleek portfolio, a dynamic business site, or a custom web app, I bring expertise in design, functionality, and user experience to bring your vision to life. Let’s work together!
          </p>
        </div>
      </div>

      <div className="features-cta">
        <div>
          <h2>Just one click away from greatness...</h2>
          <Link className='feat-btn' to='/signup'>Get Started</Link>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

export default About;
