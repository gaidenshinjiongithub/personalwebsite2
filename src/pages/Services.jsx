import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function Services() {
  const handleGetStarted = () => {
    window.location.href = '/signup'; 
  };

  return (
    <>
      <Navbar />

      <div className="hero-container">
        <div className="hero-cta"></div>

        <div className="hero-t">
          <h1>A Full Range of Services...</h1>
        </div>

        <div className="profile-hero-img">
          <img 
            src="public/pexels-kevin-ku-92347-577585.jpg" 
            alt="Feature hero" 
            width="625" 
            height="500" 
          />
        </div>

        <div className="hero-p">
          <p>
            I specialize in designing and developing responsive, user-friendly websites that not only look stunning but also perform seamlessly across all devices. With experience in front-end and back-end development, I work with technologies like HTML, CSS, JavaScript, React, and various CMS platforms to build custom solutions tailored to each client's needs.
            <br /><br />
            From crafting sleek portfolios and business websites to developing complex web applications, I focus on clean code, functionality, and a beautiful user experience. Whether it's launching a new project or elevating an existing one, I'm committed to delivering high-quality results that truly make an impact.
          </p>
        </div>
      </div>

      <div className="features-cta">
        <div>
          <h2>Almost there...</h2>
          <Link className='feat-btn' to="/signup" onClick={handleGetStarted}>Get Started</Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Services;
