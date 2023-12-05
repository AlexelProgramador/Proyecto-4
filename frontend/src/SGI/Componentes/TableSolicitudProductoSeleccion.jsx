import React, { useState } from 'react';

export const TableSolicitudProductoSeleccion = ({inventarioBodegaData, handleCheckboxChange}) => {
  const [selectedItems, setSelectedItems] = useState([]);

console.log(inventarioBodegaData);
  

  return (
    <div>
      {/* Mostrar detalles del inventario de la bodega o mensaje si no hay datos */}
      {inventarioBodegaData && inventarioBodegaData.length > 0 ? (
        <div>
          <div className='h5 text-uppercase pb-2'>Detalles del Inventario</div>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Seleccionar</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {inventarioBodegaData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input className='form-check-input'
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td>{item.NombreProducto}</td>
                    <td>{item.CantidadAsignada}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No hay datos en el inventario de la bodega seleccionada.</p>
      )}
    </div>
  );
};

export default TableSolicitudProductoSeleccion;