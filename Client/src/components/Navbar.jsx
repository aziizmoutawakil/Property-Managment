import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser, fetchUserData } from '../services/AuthenticationApi'; 

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserData()
        .then(data => setUsername(data.user.username))
        .catch(error => console.error('Error fetching user data', error));
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to='/' className="text-white text-xl font-semibold">Properties Management</Link>
        <div>
          {isLoggedIn ? (
            <div className='flex gap-2'>
              <h1 className="text-white px-4 py-2  rounded  transition duration-300">
               Welcom Back <span className='uppercase'> {username || 'User'} </span>
              </h1>
              <Link
                to='/'
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Logout
              </Link>
            </div>
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
