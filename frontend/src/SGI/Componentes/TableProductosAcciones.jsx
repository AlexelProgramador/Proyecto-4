import React from 'react';
import { AccionesProductosAlmacenamiento } from './AccionesProductosAlmacenamiento';


export const TablaProductosAcciones = ({almacenamientoData, setModal, handleShow}) => {
  console.log(almacenamientoData.Tipo);
  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>
          {/* aquí cambia solamente si es botiquín, no botiquin sin el acento */}
          {almacenamientoData.Tipo === ("Botiquín" || "Botiquin") ? "Inventario Botiquin" : "Inventario Bodega"}
            </div>
          {almacenamientoData.Inventario.length > 0 ? (
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Nombre Producto</th>
                  <th>Cantidad Inventario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {almacenamientoData.Inventario.map((item, index) => (
                  <tr key={index}>
                    <td>{item.NombreProducto}</td>
                    <td>{item.CantidadAsignada}</td>
                    <td> 
                        <div className='btn-group btn-group-sm'>
                          {almacenamientoData.Tipo === "Bodega" ? 
                            <AccionesProductosAlmacenamiento  
                              almacenamientoData={almacenamientoData} 
                              setModal={setModal} 
                              item={item}
                              handleShow={handleShow}/> :
                          <button className='btn btn-primary' onClick={() => handleShow(item.IdProducto)}><i className="fa-solid fa-eye"></i></button>
                          }
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>) 
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
