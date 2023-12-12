import React from 'react';
import AccionesProductos from './AccionesProductos';


export const TablaProductosAcciones = ({almacenamientoData, setModal}) => {
  // console.log(almacenamientoData);
  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>
          {almacenamientoData.Tipo === "Botiquín" || "Botiquin" ? "Inventario Botiquin" : "Invetario Bodega"}
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
                            <AccionesProductos  
                              almacenamientoData={almacenamientoData} 
                              setModal={setModal} 
                              item={item}/> :
                          <button className='btn btn-primary'><i class="fa-solid fa-eye"></i></button>
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
