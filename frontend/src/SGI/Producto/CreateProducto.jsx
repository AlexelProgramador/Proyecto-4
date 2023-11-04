import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from './HandlerProducto';

export const CreateProducto = () => {
  const [productoData, setProductoData] = useState({
    NombreProducto: '',
    LugarProducto: '',
    MarcaProducto: '',
    DescripcionProducto: '',
    CategoriaProducto: 'Sin Información',
    FechaProducto: '',
    ContenedorProducto: 'Sin Información',
    CantidadContenedorProducto: 0,
    CantidadProducto: 0,
    ValorUnitarioProducto: 0,
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProductoData({
      ...productoData,
      [e.target.name]: e.target.value
    });
  };

  const handleInsert = async () => {
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
          placeholder="Nombre del Producto"
          name="NombreProducto"
          value={productoData.NombreProducto}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Lugar del Producto"
          name="LugarProducto"
          value={productoData.LugarProducto}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Marca del Producto"
          name="MarcaProducto"
          value={productoData.MarcaProducto}
          onChange={handleInputChange}
        />
        <input
          type="date"
          placeholder="Fecha de Vencimiento del Producto"
          name="FechaProducto"
          value={productoData.FechaProducto}
          onChange={handleInputChange}
        />
        <textarea
          placeholder="Descripción del Producto"
          name="DescripcionProducto"
          value={productoData.DescripcionProducto}
          onChange={handleInputChange}
          rows={4} // Aquí puedes especificar el número de filas que deseas mostrar
          cols={50} // Aquí puedes especificar el número de columnas que deseas mostrar
        />
        
        <select
          name="EstadoProducto"
          value={productoData.EstadoProducto}
          onChange={handleInputChange}
        >
          <option value="Sin Información">Sin Información</option>
          <option value="Buen Estado">Buen Estado</option>
          <option value="Mal Estado">Mal Estado</option>
        </select>

        <select
          name="ContenedorProducto"
          value={productoData.ContenedorProducto}
          onChange={handleInputChange}
        >
          <option value="Sin Informacion">Sin Información</option>
          <option value="Caja">Caja</option>
          <option value="Kit">Kit</option>
          <option value="Paquete">Paquete</option>
          <option value="Pote">Pote</option>
          <option value="Frasco">Frasco</option>
        </select>
        
        {/*No puedo hacer que pueda escribir solo numero*/ }
        <input
          type="text"
          placeholder="Cantidad del Contenedor"
          name="CantidadContenedorProducto"
          value={productoData.CantidadContenedorProducto}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Cantidad del Producto"
          name="CantidadProducto"
          value={productoData.CantidadProducto}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Valor Unitario del Producto"
          name="ValorUnitarioProducto"
          value={productoData.ValorUnitarioProducto}
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
