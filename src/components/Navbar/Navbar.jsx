import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeAuthToken } from '../../redux/states';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authToken?.access_token);
  let userEmail = '';

  if (authToken) {
    try {
      const decoded = jwtDecode(authToken);
      userEmail = decoded.sub || ''; 
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(removeAuthToken());
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-black p-4 shadow-md flex items-center justify-between">
      <div className="text-white text-2xl font-semibold">
        <Link to="/">MyApp</Link>
      </div>

      {location.pathname === '/' ? (
        <div className="flex space-x-4">
          <Link to="/register">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Registrarse
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Login
            </button>
          </Link>
        </div>
      ) : location.pathname === '/register' ? (
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Login
            </button>
          </Link>
        </div>
      ) : location.pathname === '/login' ? (
        <div className="flex space-x-4">
          <Link to="/register">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
              Registrarse
            </button>
          </Link>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center text-white focus:outline-none"
          >
            <span className="mr-2 hidden md:block">{userEmail}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 flex items-center space-x-4 border-b border-gray-200">
                <img
                  src="/path-to-your-avatar.jpg"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-gray-900 font-semibold text-lg">{userEmail}</p>
                  <p className="text-gray-600 text-sm">{userEmail}</p>
                </div>
              </div>
              <div className="py-2">
                <ul>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
