// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">BlogBloom</h1>
        <div>
          <Link
            to="/signin"
            className="bg-white text-blue-600 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 mr-4"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
