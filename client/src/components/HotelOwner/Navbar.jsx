import React, { useState, useEffect } from 'react';
import { Link, useLocation  , useNavigate} from 'react-router-dom';
import { assets } from '../../asset/assets';
// import { useAppContext } from '../../context/AppContext.jsx';
import useAuth from '../../context/useAuth.js';

const Navbar = () => {
  // const { user, isOwner, setShowHotelReg, navigate } = useAppContext();
  const {  username , role , isAuthenticated } = useAuth();

   const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hotels', path: '/rooms' },
    { name: 'Experience', path: '/' },
    { name: 'About', path: '/' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10 || location.pathname !== '/');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50
      ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur-md py-3 text-gray-700' : 'py-6 text-white'}`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className={`h-9 ${isScrolled && 'invert opacity-80'}`}
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className={`relative group font-medium ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {link.name}
            <span
              className={`absolute left-0 -bottom-1 h-0.5 w-0 bg-current transition-all group-hover:w-full`}
            />
          </Link>
        ))}

        {/* Owner/User Buttons */}
        {isAuthenticated ? (
          <button
            onClick={() => (role !== " user" ? navigate('/owner') : setShowHotelReg(true))}
            className={`border px-4 py-1 text-sm font-light rounded-full transition-all ${
              isScrolled ? 'text-black border-gray-700 hover:bg-gray-100' : 'text-white border-white hover:bg-white hover:text-black'
            }`}
          >
            {role !== "user" ? 'Dashboard' : 'List Your Hotel'}
          </button>

        ) : (
          <button
            onClick={() => navigate('/login')}
            className={`px-6 py-2 rounded-full transition-all ${
              isScrolled ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center md:hidden gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`focus:outline-none ${isScrolled ? 'invert' : ''}`}
        >
          <img src={assets.menuIcon} alt="menu" className="h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-800 flex flex-col items-center justify-center gap-8 text-lg transition-transform duration-500 md:hidden
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close" className="h-6" />
        </button>

        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}


        {/* Owner/User Buttons */}
        {isAuthenticated && (
          <button
            onClick={() => {
              setIsMenuOpen(false);
               role !== "user" ? navigate('/owner') : setShowHotelReg(true);
            }}
            className="border px-4 py-1 rounded-full"
          >
            { role !== "user" ? 'Dashboard' : ''}
          </button>
        )}

        {!isAuthenticated && (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate('/login');
            }}
            className="bg-black text-white px-6 py-2 rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
