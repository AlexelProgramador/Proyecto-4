import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from '../Producto/HandlerProducto';

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

  const handleInsert = async () => {
    createProducto(bodegaData)
      .then(response => {
        // Manejar la respuesta si es necesario
        console.log(response.data);
        // Redirigir a la página deseada después de agregar una nueva bodega
        navigate('/show-bodega'); // Cambia '/ruta-de-redireccion' con la ruta deseada
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
