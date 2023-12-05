import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showProducto, updateProducto } from './HandlerProducto';
import FormProductoEdit from '../Componentes/FormProductoEdit';
import FormDesgloseProducto from '../Componentes/FormDesgloseProducto';
import FormAsignacionProducto from '../Componentes/FormAsignacionProducto';

export const EditProducto = () => {
  const [productoData, setProductoData] = useState({});
  const [cargandoAsignacion, setCargandoAsignacion] = useState(true);
  const [cargandoDesgloce, setCargandoDesgloce] = useState(true);
  const [cargandoProducto, setCargandoProducto] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  //const url = `http://localhost:8000/api/producto/${id}`; // Reemplaza con la URL de tu backend
    
  const fetchProducto = async () => {
    try {
      const data = await showProducto(id);
      setProductoData(data); 
    } catch (error) {
      console.error('Error al obtener la información del producto', error);
    } finally {
      setCargandoDesgloce(false);
      setCargandoAsignacion(false);
      setCargandoProducto(false);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateProducto(id, productoData);
      navigate('/show-producto');
      // Manejar la respuesta si es necesario
    } catch (error) {
      console.error('Error al actualizar el producto', error);
      // Manejar el error si es necesario
    }
  };
  console.log(productoData);
  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Editar Producto</div>
          {cargandoProducto ? <p>Cargando Producto...</p> :
            <FormProductoEdit 
            productoData={productoData} 
            setProductoData={setProductoData} 
            handleUpdate={handleUpdate} 
            />
          }
          <div className='row'>
            <div className='h5 pb-2'>Desgloce de los Productos</div>
            {cargandoDesgloce ? <p>Cargando Desglose...</p> :
              <FormDesgloseProducto 
              productoData={productoData}
              cargandoDesgloce={cargandoDesgloce}
              />
            }
            
            <div className='h5 pb-2'>Ubicación de los Productos</div>
            {cargandoAsignacion ? <p>Cargando Asignación...</p> :
            
              <FormAsignacionProducto 
              productoData={productoData}
              cargandoAsignacion={cargandoAsignacion}
              />
            }
          </div>
          </div>
        </div>
      </div>
    );
};

export default EditProducto;