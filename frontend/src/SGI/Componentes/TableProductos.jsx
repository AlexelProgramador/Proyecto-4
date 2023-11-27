import React from 'react';

export const TablaProductos = ({almacenamientoData}) => {
  return (
    <div>
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>Nombre Producto</th>
              <th>Cantidad Inventario</th>
              {/* Encabezados */}
            </tr>
          </thead>
          <tbody>
            {almacenamientoData.Inventario.map((item, index) => (
              <tr key={index}>
                <td>{item.NombreProducto}</td>
                <td>{item.CantidadInventario}</td>
                {/* Celdas */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaProductos;
