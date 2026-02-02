import React, { useEffect } from 'react';
import Navbar from '../../components/HotelOwner/Navbar';
import SideBar from '../../components/HotelOwner/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';

const Layout = () => {
  const { isOwner, user } = useAppContext();
  const navigate = useNavigate(); // Using react-router-dom's navigate

  useEffect(() => {
    // Redirect if not logged in or not a hotel owner
    const token = localStorage.getItem('token');
    if (!token || !user || !isOwner) {
      navigate('/');
    }
  }, [user, isOwner, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full">
        <SideBar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
