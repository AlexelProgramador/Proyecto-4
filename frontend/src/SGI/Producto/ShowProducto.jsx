import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDatos } from '../Hooks/useFetchRequest';
import TableDesgloseShowProducto from '../Componentes/TableShowDesgloseProducto';
import TableAsignacionShowProducto from '../Componentes/TableShowAsignacionProducto';

export const ShowProducto = () => {
  const [productoData, setProductoData] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();
  //const navigate = useNavigate();
  const url = `https://invenatrioapi-dh5yto3jj-araeris-projects.vercel.app/api/api/producto/${id}`; // Reemplaza con la URL de tu backend

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const url = `/producto/${id}`;
        const data = await fetchDatos(url);
        const datos = data.data;
        setProductoData(datos);
      } catch (error) {
        console.error('Error al obtener la información del producto', error);
      } finally{
        setCargando(false);
      }
    };
    fetchProducto();
  }, [url]);

  return (
    <div>
      {cargando ? (
      <div className="d-flex justify-content-center" style={{height:'200px'}}>
          <div className='d-flex align-items-center'>
              <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Cargando...</span>
              </div>
          </div>
      </div>
      ) 
      : (
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Producto {productoData.Nombre}</div>
          {/* <p>{productoData._id}</p> */}
          <p>{productoData.Lugar}</p>
          <div className='h6 pb-2 text-uppercase'>Desgloce de los Productos</div>
          
          {productoData.Desgloce && productoData.Desgloce.length > 0 ? (
            <TableDesgloseShowProducto productoData={productoData} />
          ) : 
            <p>No hay datos de desglose disponibles</p>
          }

          <div className='h6 pb-2 text-uppercase'>Ubicación de los Productos</div>
          {productoData.Ubicacion && productoData.Ubicacion.length > 0 ? (
            <TableAsignacionShowProducto productoData={productoData} />
          ) : 
            <p>No hay datos de ubicación disponibles</p>
          }
        </div>
      </div>
      )}
    </div>
  );
};

export default ShowProducto;
