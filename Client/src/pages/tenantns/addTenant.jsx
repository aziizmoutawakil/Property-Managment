import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTenant } from '../../services/TenantApi';
import { fetchProperties } from '../../services/PropertyApi';
import { Link } from 'react-router-dom';

function AddTenant() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    section: '',
    propertyId: '',
  });
  const [properties, setProperties] = useState([]); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await fetchProperties();
        setProperties(response); 
      } catch (error) {
        setError('Failed to fetch properties.');
      }
    };

    fetchAllProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTenant(formData);
      navigate('/tenants');
    } catch (error) {
      setError('Failed to add tenant. Please check your input and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Tenant</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-3"
            />
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-3"
            />
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="Section"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-3"
            />

            <select
              id="propertyId"
              name="propertyId"
              value={formData.propertyId}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-3"
            >
              <option value="" disabled>Select Property</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-[#295F98] hover:bg-[#386596] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Create Tenant
            </button>
            <Link
              to="/tenants"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTenant;
