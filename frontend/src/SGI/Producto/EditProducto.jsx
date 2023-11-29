import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showProducto, updateProducto } from './HandlerProducto';
import { NewDesgloce } from './Componentes/NewDesgloce'; 
import NewAsignacion from './Componentes/NewAsignacion';
import FormProductoEdit from '../Componentes/FormProductoEdit';
import FormDesgloseProducto from '../Componentes/FormDesgloseProducto';

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

  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          {}
          <div className='h5 text-uppercase pb-2'>Editar Producto</div>
            <FormProductoEdit 
              productoData={productoData} 
              setProductoData={setProductoData} 
              handleUpdate={handleUpdate} 
            />
            <div className='row'>
              <div className='h5 pb-2'>Desgloce de los Productos</div>
              <FormDesgloseProducto 
                productoData={productoData}
                cargandoDesgloce={cargandoDesgloce}
              />
              {cargandoDesgloce ? <p> CArgando datos..</p> : <NewDesgloce productoData ={productoData}/>}
              <div className='h5 pb-2'>Ubicación de los Productos</div>
              {productoData.Ubicacion && productoData.Ubicacion.length > 0 ? (
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>Tipo de Proceso</th>
                        <th>Ubicación Producto</th>
                        <th>Cantidad Asignada</th>
                        <th>Fecha Proceso Producto</th>
                        {/* Encabezados */}
                      </tr>
                    </thead>
                    <tbody>
                      {productoData.Ubicacion.map((item, index) => (
                        <tr key={index}>
                          <td>{item.TipoProcesoProducto}</td>
                          <td>{item.NombreUbicacionBodega}</td>
                          <td>{item.CantidadAsignadaProducto}</td>
                          <td>{item.FechaProcesoProducto}</td>
                          {/* Celdas */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                ) : 
                  <p>No hay datos de inventario disponibles</p>
              }
              {cargandoAsignacion ? <p> CArgando datos..</p> : <NewAsignacion desglose = {productoData.Desgloce}/>}
            </div>
          </div>
        </div>
      </div>
    );
};

export default EditProducto;
