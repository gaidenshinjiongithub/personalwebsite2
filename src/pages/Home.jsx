import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
    return (
      <>
        <Navbar/>

        <div className="hero-container">
          <div className="hero-t">
            <h1>Empower your startup by hiring a web developer</h1>
          </div>
          <div className="hero-p">
            <p>So that you can work on growing your business.</p>
          </div>
          
          <Link to="/signup" className="hero-cta-btn">Get Started</Link>
          <Link to="/contact" className="hero-contact-btn">Contact Us</Link>
        </div>

        <div className="hero-img">
          <img src="personal_website_heade.png" alt="Feature-hero image" width="1025" height="800" />
        </div>

        <div className="features-container">
          <div className="features-card-1">
          <h3 style={{ color: 'black' }}>Quick turnaround</h3>
          </div>
          <div className="features-card-2">
          <h3 style={{ color: 'black' }}>Flexible</h3>
          </div>
          <div className="features-card-3">
          <h3 style={{ color: 'black' }}>Scalable</h3>
          </div>
        </div>

        <div className="feature-hero-container">
          <img src="istockphoto-529746347-612x612.jpg" alt="Happy Customer" width="125" height="200" className="rounded-pill" />
          <div className="feature-hero-t">
          <h3 style={{ color: 'black' }}>Review from Happy Customer, Five Stars...</h3>
            <h4 style={{ color: 'black' }}>★★★★★</h4>
          </div>
          <div className="feature-hero-p">
            
            <p style={{ color: 'black' }}>"You need to have a website made from this guy, my company is going gangbusters because of this guy! He's a pretty smart guy..." — <b>Rich Uncle Milburn Pennybags, Majority Shareholder and CEO at ACME, INC.</b></p>
          </div>
        </div>

        <div className="features-cta">
          <div>
            <h2>Ready to bring your business to life?</h2>
            <Link className='feat-btn' to="/signup">Get Started</Link>
          </div>
        </div>

        <Footer />
      </>
    );
}

export default Home;
