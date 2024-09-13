import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-700 to-black p-4 shadow-md flex items-center justify-between">

      <div className="text-white text-2xl font-semibold">
        <Link to="/">MyApp</Link>
      </div>

   
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center text-white focus:outline-none"
        >
          <span className="mr-2 hidden md:block">John Doe</span>
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
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4 flex items-center space-x-4 border-b border-gray-200">
              <img
                src="/path-to-your-avatar.jpg"
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-900 font-semibold text-lg">John Doe</p>
                <p className="text-gray-600 text-sm">johndoe@fi.uba.ar</p>
              </div>
            </div>
            <div className="py-2">
              <ul>
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 inline mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0-4c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-4 10c-1.46 0-2.74.49-3.8 1.3-.66.53-1.2 1.2-1.2 2V18c0 1.31 1.16 2.39 2.5 2.39h12c1.34 0 2.5-1.08 2.5-2.39v-1.7c0-.8-.54-1.47-1.2-2-1.06-.81-2.34-1.3-3.8-1.3H8z"
                      />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 inline mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.43 12.98a6.92 6.92 0 00.57-2.98c0-1.1-.28-2.13-.76-3.03l2.2-2.2a1 1 0 00-1.42-1.42l-2.2 2.2a6.97 6.97 0 00-3.03-.76c-.72 0-1.42.12-2.1.35a1 1 0 00-.58-.33L11.7 2.59a1 1 0 00-1.41 0l-2.2 2.2a6.91 6.91 0 00-2.98.57C4.66 8.2 4 9.5 4 11c0 1.49.66 2.8 1.7 3.81a6.91 6.91 0 00.57 2.98l-2.2 2.2a1 1 0 001.42 1.42l2.2-2.2c.62.23 1.28.33 1.98.33 1.1 0 2.13-.28 3.03-.76l2.2 2.2a1 1 0 001.42-1.42l-2.2-2.2zM12 15.5a3.5 3.5 0 01-3.5-3.5 3.5 3.5 0 013.5-3.5 3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5z"
                      />
                    </svg>
                    Settings
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => console.log('Logout')}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5 inline mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H3m14-8l-4 4m0 0l4 4m-4-4h14"
                      />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
