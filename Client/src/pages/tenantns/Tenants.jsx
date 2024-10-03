import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FetchTenants, DeleteTenant } from '../../services/TenantApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Tenants() {
  const [Tenants, setTenants] = useState([]);

  const handleDelete = async (id) => {
    try {
      await DeleteTenant(id);
      setTenants(Tenants.filter((tenant) => tenant.id !== id));

      toast.success('Tenant deleted successfully!', {
        position: 'top-right',
        autoClose: 3000,  
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error deleting tenant:', error.message || error);

      // Show error toast
      toast.error('Failed to delete tenant. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    const getTenants = async () => {
      try {
        const data = await FetchTenants();
        setTenants(data);
      } catch (error) {
        setTenants([]);
      }
    };
    getTenants();
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Tenants</h2>
          <div className="flex gap-4">
            <Link
              to="/addtenant"
              className="bg-[#295F98] hover:bg-[#35679c] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Create
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(Tenants) && Tenants.length > 0 ? (
            Tenants.map((tenant) => (
              <li key={tenant.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">{tenant.name}</h4>
                  <p className="text-gray-600 mb-1">{tenant.contact}</p>
                  <p className=" text-xl text-gray-800 mb-2">{tenant.section}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/updatetenant/${tenant.id}`}
                      className="bg-[#295F98] hover:bg-[#33669c] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      onClick={() => handleDelete(tenant.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No Tenants available</p>
          )}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Tenants;
