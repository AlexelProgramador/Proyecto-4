import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDatos } from '../Hooks/useFetchRequest';
import { putReq } from '../Hooks/usePutRequest';
import FormProductoEdit from '../Componentes/FormProductoEdit';
import FormDesgloseProducto from '../Componentes/FormDesgloseProducto';
import FormAsignacionProducto from '../Componentes/FormAsignacionProducto';
import { useModal } from '../Componentes/Modal';

export const EditProducto = () => {
  const [productoData, setProductoData] = useState({});
  const [cargandoAsignacion, setCargandoAsignacion] = useState(true);
  const [cargandoDesgloce, setCargandoDesgloce] = useState(true);
  const [cargandoProducto, setCargandoProducto] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setModal } = useModal()
  //const url = `http://localhost:8000/api/producto/${id}`; // Reemplaza con la URL de tu backend
    
  const fetchProducto = async () => {
    try {
      const url = `/producto/${id}`;
      const data = await fetchDatos(url);
      setProductoData(data.data); 
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
      const url = `/producto/${id}`;
      putReq(url, productoData)
      .then(data => {
        if (data.status === 200 || data.statusCode === 200) {
          navigate('/show-producto');
        }
      })
      .catch(error => {
        console.error('Error al actualizar producto: ', error);
      });
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
            <div className='h6 pb-2 text-uppercase'>Desgloce de los Productos</div>
            {cargandoDesgloce ? <p>Cargando Desglose...</p> :
              <FormDesgloseProducto 
              productoData={productoData}
              cargandoDesgloce={cargandoDesgloce}
              setModal={setModal}
              fetchProducto={fetchProducto}
              />
            }
            
            <div className='h6 pb-2 text-uppercase'>Ubicación de los Productos</div>
            {cargandoAsignacion ? <p>Cargando Asignación...</p> :
            
              <FormAsignacionProducto 
              productoData={productoData}
              cargandoAsignacion={cargandoAsignacion}
              fetchProducto={fetchProducto}
              />
            }
          </div>
          </div>
        </div>
      </div>
    );
};

export default EditProducto;
