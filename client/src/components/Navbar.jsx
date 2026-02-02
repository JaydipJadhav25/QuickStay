import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../asset/assets";
// import { useAppContext } from "../context/AppContext.jsx";
import useAuth from "../context/useAuth.js";
import { toast} from "sonner"
import { axiosInstance } from "../config/axiosIntances.js";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();



   const {  username , role , isAuthenticated  , logout} = useAuth();

  useEffect(() => {
    setIsScrolled(location.pathname !== "/");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const BookIcon = () => (
    <svg
      className="w-4 h-4 text-gray-700"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
      />
    </svg>
  );





  const handleLogout = async() => {
    try {

     const res = await axiosInstance.get('/api/user/logout');
      console.log("response : " , res);
    toast.error("User Logout successfully! ")
    logout();
    navigate("/"); 
      
    } catch (error) {
      console.log("usr logout error : " , error);
      toast.error("User Logout Error! ")
    }finally {
          setIsProfileOpen(false);
    }
  };

  return (
    
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6 text-white"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          width="157"
          height="40"
          className={`h-9 ${isScrolled && "invert opacity-80"}`}
          alt="logo"
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}

        {/* Owner / List Hotel Button */}
        {isAuthenticated && (
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              isScrolled ? "text-black" : "text-white"
            } transition-all`}
            onClick={() => (role !== "user" ? navigate("/owner") : setShowHotelReg(true))}
          >
            {role !== "user" ? "Dashboard" : "List Your Hotel"}
          </button>
        )}
      </div>

      {/* Desktop Right - MODIFIED SECTION */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`${isScrolled ? "invert" : ""} h-7 transition-all duration-500`}
        />

        {isAuthenticated ? (
          <div className="relative">
            {/* Username / Profile Trigger */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${
                 isScrolled 
                 ? "border-gray-300 hover:bg-gray-100" 
                 : "border-white/50 hover:bg-white/20"
              }`}
            >
              {/* User Avatar Circle */}
              <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm">
                 {/* Show first letter of username */}
                 {username ? username[0].toUpperCase() : "U"}
              </div>
              <span className="font-medium text-sm">{username}</span>
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 border-b border-gray-100">
                   <p className="text-xs text-gray-500">Signed in as</p>
                   <p className="font-semibold truncate text-sm">{username}</p>
                </div>
                
                <button
                  onClick={() => {
                    navigate("/my-bookings");
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <BookIcon className="w-4 h-4" /> My Bookings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 flex items-center gap-2 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
            
            {/* Click outside closer (optional backdrop) */}
            {isProfileOpen && (
               <div 
                 className="fixed inset-0 z-40" 
                 onClick={() => setIsProfileOpen(false)}
               ></div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className={`px-8 py-2.5 rounded-full transition-all duration-500 ${
              isScrolled ? "text-white bg-black" : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        {isAuthenticated && (
          <button onClick={() => navigate("/my-bookings")} className="border px-3 py-1 rounded">
            <BookIcon />
          </button>
        )}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt="menu"
          className={`${isScrolled && "invert"} h-4`}
        />
      </div>

      {/* Mobile Menu (Kept same as provided) */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
          <img src={assets.closeIcon} alt="close-menu" className="h-6.5" />
        </button>

        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </Link>
        ))}

        {isAuthenticated && (
          <button
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer"
            onClick={() => (role !== "user" ? navigate("/owner") : setShowHotelReg(true))}
          >
            {role !== "user" ? "Dashboard" : "List Your Hotel"}
          </button>
        )}
        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </button>
        ) : (
           <button
            onClick={handleLogout}
            className="text-red-500 font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </nav>

  );
};

export default Navbar;
