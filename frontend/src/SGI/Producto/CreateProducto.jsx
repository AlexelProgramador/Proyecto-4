import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from './HandlerProducto';

export const CreateProducto = () => {
  const [productoData, setProductoData] = useState({
    NombreProducto: '',
    LugarProducto: '',
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProductoData({
      ...productoData,
      [e.target.name]: e.target.value
    });
  };

  const handleInsert = () => {
    createProducto(productoData)
      .then(data => {
        console.log(data);
        navigate('/show-producto');
      })
      .catch(error => {
        console.error('Error al insertar datos: ', error);
      });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Nombre de la Producto"
          name="NombreProducto"
          value={productoData.NombreProducto}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Lugar de la Producto"
          name="LugarProducto"
          value={productoData.LugarProducto}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleInsert}>
          Insertar Datos de Producto
        </button>
      </form>
    </div>
  );
};

export default CreateProducto;
