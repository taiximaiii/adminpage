import React, { useState } from "react";
import './Register.css'; 
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../service/authen";

export const Register = () => {
  const navigate = useNavigate(); 

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegisterChange = (e) => {
    const { id, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!registerData.username || !registerData.password || !registerData.email || !registerData.phoneNumber) {
      alert("Please fill in all registration fields.");
      return;
    }

    try {
      const response = await registerApi(registerData);
      console.log("Registration successful", response.data);

      setRegistrationSuccess(true);

      navigate("/login");

    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-form">
          <div className="register-header">
            <h1 className="register-title">Create an Account</h1>
          </div>
          {registrationSuccess ? (
            <div className="success-message">
              Registration successful! Please proceed to <Link to="/login">Login</Link>.
            </div>
          ) : (
            <form className="user-form" onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="user-input"
                  id="username"
                  placeholder="Enter Username..."
                  value={registerData.username}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="user-input"
                  id="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="user-input"
                  id="email"
                  placeholder="Enter Email Address..."
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  className="user-input"
                  id="phoneNumber"
                  placeholder="Enter Phone Number..."
                  value={registerData.phoneNumber}
                  onChange={handleRegisterChange}
                />
              </div>
              <button type="submit" className="user-btn">
                Register
              </button>
            </form>
          )}
          <div className="login-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
