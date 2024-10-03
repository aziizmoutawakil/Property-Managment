import axios from 'axios'

const getAuthToken = () => {
    return localStorage.getItem('authtoken')
}

export const FetchTenants = async () => {
    try {
        const Tenant = await axios.get('http://localhost:4000/tenant/view')
    return Tenant.data;
    } catch (error) {
        console.error('Error Fetching Trnants:' , error);
        return [];        
 }
}
export const DeleteTenant = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/tenant/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
  
      const responseBody = await response.text(); 
      return responseBody ? JSON.parse(responseBody) : null; 
  
    } catch (error) {
      console.error('Error deleting tenant:', error.message || error);
      throw error;
    }
  };
  
  
export const addTenant = async (tenantData) => {
    try {
        const response = await axios.post('http://localhost:4000/tenant/create/', tenantData,{
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`, 
                'Content-Type': 'application/json',
              },
              withCredentials: true,
        } ) 
        return response.data;
        
    } catch (error) {
        console.error('Error adding tenant:', error.response ? error.response.data : error.message);
    throw error;
    }
}
