import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPropertyById, updateProperty } from '../../services/PropertyApi';
import { Link } from 'react-router-dom';


function UpdateProperties() {
  const { id } = useParams(); 
  const [property, setProperty] = useState({
    name: '',
    address: '',
    type: '',
    number_of_units: '',
    rental_cost: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProperty = async () => {
      try {
        const data = await fetchPropertyById(id); 
        setProperty(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error);
        setIsLoading(false);
      }
    };

    getProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProperty(id, property); 
      navigate('/properties'); 
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto p-8">
      <h1 className="text-3xl font-bold text-black mb-6">Update Property</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          id="name"
          name="name"
          value={property.name}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <input
          type="text"
          id="address"
          name="address"
          value={property.address}
          onChange={handleChange}
          placeholder="Address"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <input
          type="text"
          id="type"
          name="type"
          value={property.type}
          onChange={handleChange}
          placeholder="Type"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <input
          type="text"
          id="number_of_units"
          name="number_of_units"
          value={property.number_of_units}
          onChange={handleChange}
          placeholder="Number of Units"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <input
          type="text"
          id="rental_cost"
          name="rental_cost"
          value={property.rental_cost}
          onChange={handleChange}
          placeholder="Rental Cost"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            type="submit"
            className="bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full"
          >
            Update Property
          </button>
          <Link
            to="/properties"
            className="border-green-500 text-center font-bold py-3 px-4 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default UpdateProperties;
