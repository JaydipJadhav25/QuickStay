import React from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/HotelOwner/Layout';
import Dashboard from './pages/HotelOwner/Dashboard';
import AddRoom from './pages/HotelOwner/AddRoom';
import ListRoom from './pages/HotelOwner/ListRoom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();

  return (
    <div>
      {/* <Toaster /> */}
      {!isOwnerPath && <Navbar />}
      {showHotelReg && <HotelReg />}

      <div className='min-h-[70vh] w-full'>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Protected User Route */}
          <Route path='/my-bookings' element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          } />

          {/* Protected Hotel Owner Routes */}
          <Route path='/owner' element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
