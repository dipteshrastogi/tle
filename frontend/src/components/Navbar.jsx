import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useTheme } from './ThemeProvider.jsx';

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (e) => {
    if (authUser.role === "admin") {
      navigate("/addYtLink");
    } else {
      toast.error("Sorry, You're not an admin");
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  }

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white px-4 md:px-6 py-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex justify-between items-center w-full md:w-auto">
          <h1 className="text-xl md:text-2xl font-bold">TLE Eliminators</h1>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>
        
        {/* Navigation links */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 md:space-x-4 space-y-2 md:space-y-0`}>
          <Link to="/" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {!authUser && <Link to="/signup" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Signup</Link>}
          {!authUser && <Link to="/login" className="hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Login</Link>}
          {authUser && <button className="hover:text-gray-300 text-left" onClick={handleLogout}>Logout</button>}
          {authUser && (<button className="hover:text-gray-300 text-left" onClick={handleClick}>Add Solutions</button>)}
          <button 
            className="flex items-center hover:text-gray-300" 
            onClick={handleToggle}
          >
            {theme === "dark" ? (
              <>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
                Light Mode
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                Dark Mode
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
