import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDatos } from '../Hooks/useFetchRequest';
import TableDesgloseShowProducto from '../Componentes/TableShowDesgloseProducto';
import TableAsignacionShowProducto from '../Componentes/TableShowAsignacionProducto';

export const ShowProducto = () => {
  const [productoData, setProductoData] = useState({});
  const { id } = useParams();
  //const navigate = useNavigate();
  const url = `http://localhost:8000/api/producto/${id}`; // Reemplaza con la URL de tu backend

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const url = `/producto/${id}`;
        const data = await fetchDatos(url);
        const datos = data.data;
        setProductoData(datos);
      } catch (error) {
        console.error('Error al obtener la información del producto', error);
      }
    };
    fetchProducto();
  }, [url]);

  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Producto {productoData.Nombre}</div>
          <p>{productoData._id}</p>
          <p>{productoData.Lugar}</p>
          <div className='h5 pb-2'>Desgloce de los Productos</div>
          
          {productoData.Desgloce && productoData.Desgloce.length > 0 ? (
            <TableDesgloseShowProducto productoData={productoData} />
          ) : 
            <p>No hay datos de desglose disponibles</p>
          }

          <div className='h5 pb-2'>Ubicación de los Productos</div>
          {productoData.Ubicacion && productoData.Ubicacion.length > 0 ? (
            <TableAsignacionShowProducto productoData={productoData} />
          ) : 
            <p>No hay datos de ubicación disponibles</p>
          }
          
        </div>
      </div>
    </div>
  );
};

export default ShowProducto;
