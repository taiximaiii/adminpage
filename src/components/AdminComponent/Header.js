import React, { useState } from 'react';
import {FaUserCircle, FaSearch, FaBars } from 'react-icons/fa';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header({ OpenSidebar }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleUserIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <FaBars className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <FaSearch className='icon' />
      </div>
      <div className='header-right'>
        <div className='dropdown'>
          <FaUserCircle className='icon-user' onClick={handleUserIconClick} />
          {isDropdownOpen && (
            <div className='dropdown-menu'>
              <div className='dropdown-item' onClick={() => console.log('View Profile')}>
                View Profile
              </div>
              <div className='dropdown-item' onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
  
      </div>
    </header>
  );
}

export default Header;
