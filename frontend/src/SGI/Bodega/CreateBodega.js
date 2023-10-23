import React, { useState } from 'react';
import axios from 'axios';

export const CreateBodega = () => {
  const [bodegaData, setBodegaData] = useState({
    NombreBodega: '',
    LugarBodega: '',
    InventarioBodega: []
  });

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
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
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
      </form>
    </div>
  );
};

export default CreateBodega;