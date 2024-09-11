import React, { useEffect, useState } from 'react';
import { fetchProperties, deleteProperty } from '../../services/PropertyApi';
import { Link } from 'react-router-dom';

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (error) {
        setProperties([]);
      }
    };

    getProperties();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id);
      setProperties(properties.filter(property => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error.message || error.response?.data);
    }
  };

  return (
    <div>
 <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Properties</h2>
        <div className="flex gap-4">
          <Link
            to="/addproperty"
            className="bg-[#295F98] hover:bg-[#35679c] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Create
          </Link>
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(properties) && properties.length > 0 ? (
          properties.map((property) => (
            <li key={property.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{property.name}</h4>
                <p className="text-gray-600 mb-4">{property.address}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/updateproperty/${property.id}`}
                    className="bg-[#295F98] hover:bg-[#33669c] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    onClick={() => handleDelete(property.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No properties available</p>
        )}
      </ul>
    </div>
    </div>
   
  );
}

export default Properties;
