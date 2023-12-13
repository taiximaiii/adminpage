// Sidebar.js
import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaArchive, FaUser } from 'react-icons/fa';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Extract the pathname from the location
    const pathname = location.pathname;

    // Set the active link based on the pathname
    setActiveLink(pathname);
  }, [location]);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <FaShoppingCart className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className={`sidebar-list-item ${activeLink === '/admin/products' ? 'active' : ''}`}>
          <Link to="/admin/products">
            <FaArchive className='icon' /> Products
          </Link>
        </li>
        <li className={`sidebar-list-item ${activeLink === '/admin/users' ? 'active' : ''}`}>
          <Link to="/admin/users">
            <FaUser className='icon' /> Users
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
