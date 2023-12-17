import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccionesProductosAlmacenamiento } from './AccionesProductosAlmacenamiento';
import DataTable from './DataTable';
import CreateProducto from '../Producto/CreateProducto';
import { fetchDatos } from '../Hooks/useFetchRequest';

export const TablaProductosAcciones = ({almacenamientoData, setModal, handleShow, handleEdit, handleDelete}) => {
  const [productoData, setDataProducto] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const url = '/productos';
      const response = await fetchDatos(url);
      setDataProducto(response);
    } catch (error) {
        console.error('Error al obtener datos', error);
    } finally{
      setCargandoProductos(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  let columns = [];
  let data = [];

  if (almacenamientoData.Inventario.length > 0) {
      columns = [
          { label: 'Nombre Producto', key: 'nombre' },
          { label: 'Cantidad', key: 'cant' },
          { label: 'Acciones', key: 'acciones' }
      ];
      data = almacenamientoData.Inventario.map((item) => ({
        nombre: item.NombreProducto,
        cant: item.CantidadAsignada || 0,
        acciones: (
          <div>
            <div className='btn-group btn-group-sm'>
              {almacenamientoData.Tipo === "Bodega" ? 
                <AccionesProductosAlmacenamiento  
                  almacenamientoData={almacenamientoData} 
                  setModal={setModal} 
                  item={item}
                  handleShow={handleShow}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}/> :
              <button className='btn btn-primary' onClick={() => handleShow(item.IdProducto)}><i className="fa-solid fa-eye"></i></button>
              }
            </div>
          </div>
          )                
      }));
    }

  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='d-flex justify-content-between pb-2'>
            <div className='h5 text-uppercase pb-2'>
            {/* aquí cambia solamente si es botiquín, no botiquin sin el acento */}
            {almacenamientoData.Tipo === "Bodega" ? ("Inventario Bodega") : ("Inventario Botiquín")}
            </div>
            <div className=''>
            {almacenamientoData.Tipo === "Bodega" ? (
              <>
              <button className='btn btn-success' onClick={() => navigate('/create-retiro-bodega')}>Retiro</button>
              </>
            ) : almacenamientoData.Tipo === "Botiquin" ? (              
              <>
              <button className='btn btn-success me-2 mb-1' onClick={() => navigate('/create-solicitud')}>solicitud</button>
              <button className='btn btn-success mb-1' onClick={() => navigate('/create-solicitud-botiquin')}>Retiro</button>
              </>
            ) : null }
            </div>
          </div>
          {almacenamientoData.Inventario.length > 0 ? (
            <div>
            <DataTable data={data} columns={columns} />
            </div>
          ) 
          : 
          (
            <p>No hay datos de inventario disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TablaProductosAcciones;
