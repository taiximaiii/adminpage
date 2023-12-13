import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import your custom CSS file
import { addTokenToAxios, loginApi } from "../../service/authen";

export const Login = () => {
   // Access the navigate function for navigation

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
        const response = await loginApi(loginData);      
        const userRole = response.data.role;
        console.log(userRole);
        localStorage.setItem("user", JSON.stringify(response.data));
        const accessToken = response.data.token;
        localStorage.setItem("accessToken", accessToken);
        addTokenToAxios(accessToken);
        if (userRole === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
  
      } catch (error) {
        console.error("Login failed", error);

      }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image"></div>
        <div className="login-form">
          <div className="login-header">
            <h1 className="login-title">Welcome Back!</h1>
          </div>
          <form className="user-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="user-input"
                id="username"
                placeholder="Enter Username..."
                value={loginData.username}
                onChange={handleLoginChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="user-input"
                id="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
            </div>
            <button type="submit" className="user-btn">
              Login
            </button>
          </form>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
