import React, {useState} from 'react';

export const TableSolicitudSelectedItems = ({selectedItems, inventarioBodegaData, handleInventarioChange, detalleInventarioData}) => {

  const showAlert = () => {
    alert('La cantidad no puede exceder la cantidad asignada');
  };

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
                  <td>{inventarioBodegaData[index].CantidadAsignada}</td>
                  <td>
                  <input className='form-control form-control-sm'
                    type="number"
                    id="CantidadProducto"
                    name="CantidadProducto"
                    value={detalleInventarioData[index]?.CantidadProducto || ''}
                    onChange={(e) => {
                      if (e.target.value > inventarioBodegaData[index].CantidadAsignada) {
                        showAlert();
                      } else {
                        handleInventarioChange(e, index);
                      }
                    }}
                    max={inventarioBodegaData[index].CantidadAsignada}
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