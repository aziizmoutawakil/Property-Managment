import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div></div>
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Welcome to Property Management</h1>
        <nav>
          <ul className="flex flex-col gap-6">
            <li>
              <Link
                to="/properties"
                className="block text-center text-lg text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg transition-colors"
              >
                Manage Properties
              </Link>
            </li>
            <li>
              <Link
                to="/tenants"
                className="block text-center text-lg text-white bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg transition-colors"
              >
                Manage Tenants
              </Link>
            </li>
            <li>
              <Link
                to="/payments"
                className="block text-center text-lg text-white bg-purple-500 hover:bg-purple-600 py-2 px-4 rounded-lg transition-colors"
              >
                Manage Payments
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home;
