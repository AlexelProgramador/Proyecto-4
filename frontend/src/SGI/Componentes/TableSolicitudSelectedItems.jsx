import React from 'react';

export const TableSolicitudSelectedItems = ({selectedItems, inventarioBodegaData, handleInventarioChange, detalleInventarioData}) => {

  return (
    <div>
      {selectedItems.length > 0 && (
        <div>
          <div className='h5 text-uppercase pb-2'>Objetos seleccionados</div>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad Actual</th>
                  <th>Número de Inventario a Pedir</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((index) => (
                  <tr key={index}>
                  <td>{inventarioBodegaData[index].NombreProducto}</td>
                  <td>{inventarioBodegaData[index].CantidadAsignadaProducto}</td>
                  <td>
                  <input className='form-control form-control-sm'
                    type="text"
                    id="CantidadProducto"
                    name="CantidadProducto"
                    value={detalleInventarioData[index]?.CantidadProducto || ''}
                    onChange={(e) => handleInventarioChange(e, index)}
                    pattern="\d*" // Asegura que solo se ingresen números
                    title="Ingresa solo números"
                  />
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
      )}
    </div>
  );
};

export default TableSolicitudSelectedItems;