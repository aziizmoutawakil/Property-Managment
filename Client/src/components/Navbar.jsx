import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
function Navbar({ isLoggedIn, setIsLoggedIn }) {

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/auth/logout', {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">MyApp</div>
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <div className="flex space-x-4">
              <Link to='/login' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                Login
              </Link>
              <Link to='/register' className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
