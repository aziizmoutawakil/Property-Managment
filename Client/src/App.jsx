import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/properties/Properties';
import AddProperties from './pages/properties/AddProperties';
import UpdateProperties from './pages/properties/UpdateProperties';

import Tenants from './pages/tenantns/Tenants';
import AddTenant from './pages/tenantns/addTenant';
import UpdateTenants from './pages/tenantns/updateTenant' 

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
        <Route path="/addtenant" element={<AddTenant />} />
        <Route path="/updatetenant/:id" element={<UpdateTenants />} />
     
      </Routes>
    </Router>
  );
}

export default App;
