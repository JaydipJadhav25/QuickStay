import React, { useEffect } from 'react';
import Navbar from '../../components/HotelOwner/Navbar';
import SideBar from '../../components/HotelOwner/SideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.jsx';
import useAuth from '../../context/useAuth.js';

const Layout = () => {
  // const { isOwner, user } = useAppContext();

   const  { isAuthenticated , role} = useAuth();

  const navigate = useNavigate(); // Using react-router-dom's navigate

  useEffect(() => {
   

    if (role !== "admin") {
      navigate('/');
    }
  }, [isAuthenticated , navigate]);

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
