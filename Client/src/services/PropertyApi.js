import axios from 'axios';



const getAuthToken = () => {
  
  return localStorage.getItem('authToken'); 
};


export const deleteProperty = async (id) => {
  const response = await fetch(`http://localhost:4000/property/delete/${id}`, {
    method: 'DELETE',
    credentials: 'include',  
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete property');
  }
};




export const fetchPropertyById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:4000/property/view/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    throw error; 
  }
};

export const addProperty = async (propertyData) => {
  try {
    const response = await axios.post('http://localhost:4000/property/create', propertyData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`, 
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding property:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateProperty = async (id, property) => {
  try {
    const response = await axios.put(`http://localhost:4000/property/update/${id}`, property, { headers: {
    'Authorization': `Bearer ${getAuthToken()}`, 
    'Content-Type': 'application/json',
  },
  withCredentials: true,} );
  return response.data;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error; 
  }
};

export const fetchProperties = async () => {
  try {
    const response = await axios.get('http://localhost:4000/property/view');
    return response.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};
