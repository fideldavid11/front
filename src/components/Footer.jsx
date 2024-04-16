import React from 'react';
import { FaLaptopCode } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-blue-900 py-4 mt-8">
      <div className="container mx-auto flex justify-center items-center text-white">
        <p className="text-lg font-medium flex items-center"> {/* Añade la clase flex y items-center al párrafo */}
          Fullstack by: Fidel Peguero 2021-0620
          <span className="ml-2"><FaLaptopCode /></span>
        </p>
      </div>
    </div>
  );
}

export default Footer;

