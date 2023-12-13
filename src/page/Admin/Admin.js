import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import './Admin.css';
import Header from "../../components/AdminComponent/Header";
import Sidebar from "../../components/AdminComponent/Sidebar";
import Product from "../../components/AdminComponent/Product";
import User from "../../components/AdminComponent/User";
import Category from "../../components/AdminComponent/Category";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const userData = JSON.parse(storedUser);

      if (userData.role === "ADMIN") {
        setUser(userData);
      } else {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <div className="admin-content">
        <Routes>
          <Route path="/products" element={<Product />} />
          <Route path="/users" element={<User />} />
          <Route path="/categorys" element={<Category />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
