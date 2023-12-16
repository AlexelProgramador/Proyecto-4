import React from 'react';
import DataTableSM from './DataTableSM';

export const TableSolicitudProductoSeleccion = ({inventarioBodegaData, handleCheckboxChange,selectedItems}) => {
  let columns = [];
  let data = [];

  if (inventarioBodegaData && inventarioBodegaData.length > 0) {
      columns = [
          { label: 'Seleccionar', key: 'select' },
          { label: 'Producto', key: 'pro' },
          { label: 'Cantidad', key: 'cant' }
      ];
      data = inventarioBodegaData.map((item, index) => ({
        select: (
          <div> 
            <input className='form-check-input'
              type="checkbox"
              checked={Array.isArray(selectedItems) && selectedItems.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
          </div>
        ),
        pro: item.NombreProducto,
        cant: item.CantidadAsignada,
      }));
    }

  return (
    <div>
      {/* Mostrar detalles del inventario de la bodega o mensaje si no hay datos */}
      {inventarioBodegaData && inventarioBodegaData.length > 0 ? (
        <div>
          <div className='h6 text-uppercase pb-2'>Detalles del Inventario</div>
          <DataTableSM data={data} columns={columns}/>
          {/* <div className='table-responsive'>
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
                        checked={Array.isArray(selectedItems) && selectedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td>{item.NombreProducto}</td>
                    <td>{item.CantidadAsignada}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </div>
      ) : (
        <p>No hay datos en el inventario de la bodega seleccionada.</p>
      )}
    </div>
  );
};

export default TableSolicitudProductoSeleccion;