import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  return (
    <>

      <div className="about-page">
        <a href="/" className="navbar-logo">
          <img src="/assets/156.jpg" height="50" width="100" alt="Logo" />
          <b>MoonDev</b>
        </a>

        <div className="registration-container">
          <h2>I’ll get back to you shortly!</h2>
          <form action="#" method="post">
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input type="email" id="email" name="email-address" required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="contact-message" required></textarea>
            </div>

            <div className="button-group">
              <input type="submit" value="Submit" />
              <input type="reset" value="Reset" />
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

export default Contact;
