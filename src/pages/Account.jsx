import React, { useState, useEffect } from 'react';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Tooltip from '../components/Tooltip'; 

function Account() {
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState({ message: "", type: "", visible: false });

  const [userData, setUserData] = useState({
    id: null,
    firstname: '',
    lastname: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
  });

  const API = "http://localhost:5000";
  const userId = localStorage.getItem("primaryId");

  const showTooltip = (message, type = "info", duration = 3000) => {
    setTooltip({ message, type, visible: true });
    setTimeout(() => {
      setTooltip(prev => ({ ...prev, visible: false }));
    }, duration);
  };

  const fetchData = async () => {
    if (!userId) {
      console.error("No primaryId found in localStorage.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/account?userId=${userId}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.status === 204) {
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      setUserData({
        id: data.id,
        firstname: data.first_name,
        lastname: data.last_name,
        address_line_1: data.address_1,
        address_line_2: data.address_2 || '',
        city: data.city,
        state: data.state,
        zip: data.zip_code,
        phone: data.phone_number,
        email: data.email,
      });
    } catch (err) {
      console.error('Error fetching data:', err);
      showTooltip("Failed to load account data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: userData.id,
      userId,
      firstname: userData.firstname,
      lastname: userData.lastname,
      address_line_1: userData.address_line_1,
      address_line_2: userData.address_line_2,
      city: userData.city,
      state: userData.state,
      zip: userData.zip,
      phone: userData.phone,
      email: userData.email,
    };

    try {
      const res = await fetch(`${API}/account`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();

      setUserData({
        id: updated.id,
        firstname: updated.first_name,
        lastname: updated.last_name,
        address_line_1: updated.address_1,
        address_line_2: updated.address_2 || '',
        city: updated.city,
        state: updated.state,
        zip: updated.zip_code,
        phone: updated.phone_number,
        email: updated.email,
      });

      showTooltip("Account updated successfully 🎉", "success");
    } catch (err) {
      console.error('Error updating data:', err);
      showTooltip("Something went wrong while saving.", "error");
    }
  };

  const handleChange = (e) => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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

        
        {tooltip.visible && (
          <Tooltip message={tooltip.message} type={tooltip.type} visible={tooltip.visible} />
        )}

        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : (
          <div className="registration-container">
            <h2>My Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name:</label>
                <input name="firstname" value={userData.firstname} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input name="lastname" value={userData.lastname} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Address Line 1:</label>
                <input name="address_line_1" value={userData.address_line_1} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Address Line 2:</label>
                <input name="address_line_2" value={userData.address_line_2} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input name="city" value={userData.city} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>State:</label>
                <select name="state" value={userData.state} onChange={handleChange} required>
                  <option value="">Select a state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                 
                </select>
              </div>
              <div className="form-group">
                <label>Zip:</label>
                <input name="zip" value={userData.zip} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input name="phone" value={userData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} required />
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
