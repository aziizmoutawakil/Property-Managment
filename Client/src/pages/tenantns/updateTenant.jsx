import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTenantById, UpdateTenant } from '../../services/TenantApi';
import { Link } from 'react-router-dom';

function UpdateTenants() {
  const { id } = useParams(); 
  const [tenant, setTenant] = useState({
    name: '',
    contact: '',
    section: '',
    propertyId: '',   
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getTenant = async () => {
      try {
        const data = await fetchTenantById(id); 
        setTenant(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tenant:', error);
        setIsLoading(false);
      }
    };

    getTenant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenant({ ...tenant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateTenant(id, tenant); 
      navigate('/tenants'); 
    } catch (error) {
      console.error('Error updating tenant:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto p-8">
      <h1 className="text-3xl font-bold text-black mb-6">Update Tenant</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          id="name"
          name="name"
          value={tenant.name}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <input
          type="text"
          id="contact"
          name="contact"
          value={tenant.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <input
          type="text"
          id="section"
          name="section"
          value={tenant.section}
          onChange={handleChange}
          placeholder="Section"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <input
          type="text"
          id="propertyId"
          name="propertyId"
          value={tenant.propertyId}
          onChange={handleChange}
          placeholder="Property ID"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            type="submit"
            className="bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
          >
            Update Tenant
          </button>
          <Link
            to="/tenants"
            className="border-green-500 text-center font-bold py-3 px-4 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateTenants;
