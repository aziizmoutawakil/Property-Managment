import axios from 'axios';

const getAuthToken = () => {
  return localStorage.getItem('authtoken');
};

export const fetchTenantById = async (id) => {
  try {
    const tenant = await axios.get(`http://localhost:4000/tenant/view/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return tenant.data;
  } catch (error) {
    console.error('Error fetching tenant by ID:', error);
    throw error;
  }
};

export const UpdateTenant = async (id, tenant) => {
  try {
    const updatedTenant = await axios.patch(`http://localhost:4000/tenant/update/${id}`, tenant, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return updatedTenant.data;
  } catch (error) {
    console.error('Error updating tenant:', error);
    throw error;
  }
};

export const FetchTenants = async () => {
  try {
    const tenants = await axios.get('http://localhost:4000/tenant/view', {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return tenants.data;
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return []; 
  }
};

export const DeleteTenant = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:4000/tenant/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting tenant:', error.message || error);
    throw error;
  }
};

export const addTenant = async (tenantData) => {
  try {
    const response = await axios.post('http://localhost:4000/tenant/create', tenantData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding tenant:', error.response ? error.response.data : error.message);
    throw error;
  }
};
