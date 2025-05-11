import React, { useState, useEffect } from "react";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";
import './Auth.css';

function Auth({ mode = "login" }) {
  const [tooltip, setTooltip] = useState({ message: "", type: "", visible: false });

  const [primaryId, setPrimaryId] = useState(() => localStorage.getItem("primaryId") || "");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const saltRounds = 10;

  useEffect(() => {
    if (primaryId) {
      localStorage.setItem("primaryId", primaryId);
    }
    if (user_name) {
      localStorage.setItem("userName", user_name);
    }
  }, [primaryId, user_name]);

  const showTooltip = (message, type = "info", duration = 3000) => {
    setTooltip({ message, type, visible: true });
    setTimeout(() => {
      setTooltip(prev => ({ ...prev, visible: false }));
    }, duration);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPasswordErrorMsg("");
    setServerMessage("");

    if (mode === "signup" && password !== confirmPassword) {
      setPasswordErrorMsg("Password and Confirm Password do not match!");
      return;
    }

    try {
      const endpoint = mode === "signup" ? "register" : "login";
      let requestBody = { user_name };

      if (mode === "signup") {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        requestBody.password = hashedPassword;
      } else {
        requestBody.password = password;
      }

      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      const data = response.status !== 204 ? await response.json() : null;

      if (mode === "signup") {
        if (response.status === 201) {
          localStorage.setItem("primaryId", data.primaryId);
          localStorage.setItem("userName", user_name);
          setPrimaryId(data.primaryId);
          showTooltip("Account created! Welcome aboard ✨", "success");
          setTimeout(() => navigate('/'), 1000);
        } else if (response.status === 409) {
          setServerMessage("Username already exists. Please log in or use another.");
          showTooltip("Username already exists. Try another one!", "error");
        } else if (response.status === 400 || response.status === 401) {
          setServerMessage("Signup failed. Please try again.");
          showTooltip("Signup failed. Please try again.", "error");
        }
      } else {
        if (response.status === 200) {
          localStorage.setItem("primaryId", data.primaryId);
          localStorage.setItem("userName", user_name);
          setPrimaryId(data.primaryId);
          showTooltip("Welcome back! You're in 💫", "success");
          setTimeout(() => navigate('/'), 1000);
        } else if (response.status === 400) {
          setServerMessage("No account with that username. Please register.");
          showTooltip("No account found with that username.", "error");
        } else if (response.status === 401) {
          setServerMessage("Incorrect password. Please try again.");
          showTooltip("Incorrect password. Want to try again?", "error");
        }
      }
    } catch (error) {
      console.error("Error during auth:", error);
      setServerMessage("Something went wrong. Please try again.");
      showTooltip("Something went wrong. Try again later 😓", "error");
    }
  };

  return (
    <div className="login-page">
      <div className="registration-container">
        <h2>{mode === "signup" ? "Sign Up" : "Log In"}</h2>

        {tooltip.visible && (
          <Tooltip
            message={tooltip.message}
            type={tooltip.type}
            visible={tooltip.visible}
          />
        )}

        <form onSubmit={handleSubmit} action="#" method="post">
          <div className="form-group">
            <label htmlFor="username">User Name:</label>
            <input
              type="text"
              id="userName"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
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

          {serverMessage && (
            <div className="error-message">
              {serverMessage}
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
