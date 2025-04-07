import React from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Account() {
  return (
    <>
      <Navbar />

      <div className="account-page">
        <a href="/" className="navbar-logo">
          <img src="/assets/156.jpg" height="50" width="100" alt="Logo" />
          <b>MoonDev</b>
        </a>

        <div className="registration-container">
          <h2>Welcome Back!</h2>
          <form action="#" method="post">
            <div className="form-group">
              <label htmlFor="firstname">First Name:</label>
              <input type="text" id="firstname" name="firstname" required />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name:</label>
              <input type="text" id="lastname" name="lastname" required />
            </div>
            <div className="form-group">
              <label htmlFor="address-line-1">Address Line 1:</label>
              <input type="text" id="address-line-1" name="address-line-1" required />
            </div>
            <div className="form-group">
              <label htmlFor="address-line-2">Address Line 2:</label>
              <input type="text" id="address-line-2" name="address-line-2" />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" required />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <select id="state" name="state" required>
                <option value="">Select a state</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                {/* etc... */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="zip">Zip:</label>
              <input type="text" id="zip" name="zip" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="button-group">
              <input type="submit" value="Submit" />
              <input type="reset" value="Reset" />
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Account;
