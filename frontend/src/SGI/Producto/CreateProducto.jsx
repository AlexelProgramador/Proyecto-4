import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    axios.post('http://localhost:8000/api/producto', productoData)
      .then(response => {
        // Manejar la respuesta si es necesario
        console.log(response.data);
        // Redirigir a la página deseada después de agregar un nuevo producto
        navigate('/show-producto'); // Cambia '/ruta-de-redireccion' con la ruta deseada
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
