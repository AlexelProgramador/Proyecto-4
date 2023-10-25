import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateBodega = () => {
  const [bodegaData, setBodegaData] = useState({
    NombreBodega: '',
    LugarBodega: '',
    InventarioBodega: []
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBodegaData({
      ...bodegaData,
      [e.target.name]: e.target.value
    });
  };

  const handleInsert = () => {
    axios.post('http://localhost:8000/api/bodega', bodegaData)
      .then(response => {
        // Manejar la respuesta si es necesario
        console.log(response.data);
        // Redirigir a la página deseada después de agregar una nueva bodega
        navigate('/'); // Cambia '/ruta-de-redireccion' con la ruta deseada
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
  };

  const handleEdit = () => {
    navigate('/edit-bodega'); // Cambia '/edit-bodega' con la ruta de edición deseada
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Nombre de la Bodega"
          name="NombreBodega"
          value={bodegaData.NombreBodega}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Lugar de la Bodega"
          name="LugarBodega"
          value={bodegaData.LugarBodega}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleInsert}>
          Insertar Datos de Bodega
        </button>
        <button type="button" onClick={handleEdit}>
          Editar Bodega
        </button>
      </form>
    </div>
  );
};

export default CreateBodega;
