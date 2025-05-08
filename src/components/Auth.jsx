import React, { useState } from "react";
import bcrypt from 'bcrypt';
import { useNavigate } from "react-router-dom";
import './Auth.css';


function Auth({ mode = "login" }) { 
  const [primaryId, setPrimaryId] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(password, salt, function(err, hash) {

    });
  });

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log(`${mode === "signup" ? 'Signup' : 'Login'} form submitted!`);

    if (mode === "signup" && password !== confirmPassword) {
      setPasswordErrorMsg("Password and Confirm Password do not match!");
      return;
    }

    try {
      const endpoint = mode === "signup" ? "register" : "login";
      const response = await fetch(`http://localhost:8080/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ userName, hash}),
      });

      const data = await response.json();

      if ((mode === "signup" && response.status === 201) || (mode === "login" && response.status === 200)) {
        console.log(`${mode === "signup" ? 'Signup' : 'Login'} successful!`, data);
        navigate('/');
      } else if ((mode === "signup" && response.status === 400) || (mode === "login" && response.status === 400 )) {
        console.error(`${mode === "signup" ? 'Signup' : 'Login'} failed:`, data);
      } else if ((mode === "signup" && response.status === 401) || (mode === "login" && response.status === 401 )) {
        console.error(`${mode === "signup" ? 'Signup' : 'Login'} failed:`, data);
      } else if ((mode === "signup" && response.status === 409)) {
        console.error(`${mode === "signup" } failed:`, data);
      }
    } catch (error) {
      console.error(`Error during ${mode === "signup" ? 'signup' : 'login'}:`, error);
    }
  };

  return (
    <div className="login-page">
      <div className="registration-container">
        <h2>{mode === "signup" ? "Sign Up" : "Log In"}</h2>

        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="form-group">
            <label htmlFor="username">User Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name="username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />
          </div>

          {mode === "signup" && (
            <div className="form-group">
              <label htmlFor="repeat-password">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirm-password"
                required
              />
            </div>
          )}

          {passwordErrorMsg && (
            <div className="error-message">
              {passwordErrorMsg}
            </div>
          )}

          <div className="button-group">
            <input type="submit" value={mode === "signup" ? "Sign Up" : "Log In"} />
            <input type="reset" value="Reset" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;