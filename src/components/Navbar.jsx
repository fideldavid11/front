import React from 'react';
import { Link } from 'react-router-dom'; 
const Navbar = () => {
  return (
    <div className="bg-blue-900 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Cedulación APP</h1>
        <div>
          <Link to="/inicio" className="text-white text-lg font-medium mr-6 hover:text-gray-300">Inicio</Link>
          <Link to="/add" className="text-white text-lg font-medium hover:text-gray-300">Agregar persona</Link>

        </div>
      </div>
    </div>
  );
};

export default Navbar;


