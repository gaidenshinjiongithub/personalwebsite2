import React from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';

function Auth({ mode = "login" }) { 
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(`${mode === "signup" ? 'Signup' : 'Login'} form submitted!`);
    navigate('/'); 
  }

  return (
    <div className="login-page">
      <div className="registration-container">
        <h2>{mode === "signup" ? "Sign Up" : "Log In"}</h2>

        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="form-group">
            <label htmlFor="username">User Name:</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>

  
          {mode === "signup" && (
            <div className="form-group">
              <label htmlFor="repeat-password">Repeat Password:</label>
              <input type="password" id="repeat-password" name="repeat-password" required />
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
