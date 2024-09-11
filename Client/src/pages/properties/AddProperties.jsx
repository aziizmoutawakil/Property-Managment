import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../../services/PropertyApi';
import { Link } from 'react-router-dom';
function AddProperties() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: '',
    number_of_units: '',
    rental_cost: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProperty(formData);
      navigate('/properties');
    } catch (error) {
      setError('Failed to add property. Please check your input and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Property</h1>
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
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-3"
            />
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-3"
            />
            <input
              type="text"
              id="number_of_units"
              name="number_of_units"
              value={formData.number_of_units}
              onChange={handleChange}
              placeholder="Number of Units"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-3"
            />
            <input
              type="text"
              id="rental_cost"
              name="rental_cost"
              value={formData.rental_cost}
              onChange={handleChange}
              placeholder="Rental Cost"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-3"
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-[#295F98] hover:bg-[#386596] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Create Property
            </button>
            <Link
              to="/properties"
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

export default AddProperties;
