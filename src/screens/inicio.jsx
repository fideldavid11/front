import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Inicio = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar datos
  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:7012/api/Cedula');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Función para eliminar datos
  const deleteData = async (id) => {
    try {
      await fetch(`https://localhost:7012/api/Cedula/${id}`, {
        method: 'DELETE'
      });
      const newData = data.filter(item => item.id !== id);
      setData(newData);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4">Cargando...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema simple de cedulacion</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Cédula</th>
              <th className="px-4 py-2">Nombre completo</th>
              <th className="px-4 py-2">Foto</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data && data.length > 0 ? (
              data.map(item => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.cedulaNumber}</td>
                  <td className="border px-4 py-2">{item.fullName}</td>
                  <td className="border px-4 py-2">
                    <img src={`https://localhost:7012/api/Cedula/getImage/${item.foto}`} alt="Foto" className="w-20 h-20 object-cover" />
                  </td>
                  <td className="border px-4 py-2 flex space-x-2">
                  <Link to={`/edit/${item.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
  <FaEdit />
</Link>

                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded" onClick={() => deleteData(item.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">No hay datos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inicio;




