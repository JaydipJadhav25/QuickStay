import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Store token in localStorage
  const saveToken = (jwtToken) => {
    localStorage.setItem('token', jwtToken);
    setToken(jwtToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setIsOwner(false);
  };

  // Get token function
  const getToken = async () => token;

  // Fetch logged-in user data
  const fetchUser = async () => {
    if (!token) return; // no token, no fetch
    try {
      const { data } = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUser({ role: data.role, recentSearchedCities: data.recentSearchedCities });
        setIsOwner(data.role === "Hotel Owner");
        setSearchedCities(data.recentSearchedCities);
      } else {
        removeToken();
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Fetch all rooms
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms');
      
      if (data.success) setRooms(data.rooms);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Run once on app load
  useEffect(() => {
    fetchRooms();
  }, []);

  // Run when token changes
  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        currency,
        navigate,
        user,
        token,
        getToken,
        saveToken,
        removeToken,
        isOwner,
        axios,
        setShowHotelReg,
        showHotelReg,
        searchedCities,
        setSearchedCities,
        rooms,
        setRooms,
        setIsOwner
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
