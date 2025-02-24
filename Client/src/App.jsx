import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/properties/Properties';
import AddProperties from './pages/properties/addProperties';
import UpdateProperties from './pages/properties/UpdateProperties';
import Tenants from './pages/Tenants';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('http://localhost:4000/auth/me', { withCredentials: true });
        if (response.data.user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addproperty" element={<AddProperties />} />
        <Route path="/updateproperty/:id" element={<UpdateProperties />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/tenants" element={<Tenants />} />
      </Routes>
    </Router>
  );
}

export default App;
