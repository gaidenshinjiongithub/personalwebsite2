import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Account() {
   const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
     firstname: '', lastname: '', address_line_1: '', address_line_2: '', city: '', state: '', zip: '', phone: '', email: '',
  });

  const API = "http://localhost:8080"


  const fetchData = async () => {
    try {
      const response = await fetch(`${API}/account`, {
        method:'GET',
        credentials: 'include', 
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API}/account`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        console.log('Data updated successfully');
      } else {
        console.error('Failed to update data');
      }
    } catch (error) {
        setLoading(false);
      console.error('Error updating data:', error);
    }
  };

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Navbar />

      <div className="account-page">
        <div className='logo-container'>
          <a href="/" className="navbar-logo">
            <img src="/156.jpg" height="50" width="100" alt="Logo" />
            <b>MoonDev</b>
          </a>
        </div>

        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : (
          
            <div className="registration-container">
              
              <h2>My Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstname">First Name:</label>
                  <input type="text" id="firstname" name="firstname" value={userData.firstname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Last Name:</label>
                  <input type="text" id="lastname" name="lastname" value={userData.lastname} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="address-line-1">Address Line 1:</label>
                  <input type="text" id="address-line-1" name="address_line_1" value={userData.address_line_1} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="address-line-2">Address Line 2:</label>
                  <input type="text" id="address-line-2" name="address_line_2" value={userData.address_line_2} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <input type="text" id="city" name="city" value={userData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State:</label>
                  <select id="state" name="state" value={userData.state} onChange={handleChange} required>
                    <option value="" >Select a state</option>
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
                  <input type="text" id="zip" name="zip" value={userData.zip} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input type="text" id="phone" name="phone" value={userData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required />
                </div>
                <div className="button-group">
                  <input type="submit" value="Submit" />
                  <input type="reset" value="Reset" />
                </div>
              </form>
           
            </div>
        )}


      </div>
     
      <Footer />
    </>
  );
}

export default Account;