import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'; // Import your custom CSS file
import { addTokenToAxios } from '../../service/authen';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const accessToken = localStorage.getItem('accessToken')
    addTokenToAxios(accessToken);
    setIsLoggedIn(!!storedUser);
    if (isLoggedIn && storedUser.role === 'ADMIN') {
      navigate('/admin');
    }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <Link className="navbar-brand" to="/">Home</Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="nav-link" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="jumbotron">
        <h1 className="display-4">Welcome to the Home Page!</h1>
        <p className="lead">This is a simple home page with a navigation bar.</p>
      </div>
    </div>
  );
};

export default Home;
