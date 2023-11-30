import React from 'react';

export const TableDesgloseShowProducto = ({productoData}) => {
  return (
    <div>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Cantidad Contenedor</th>
                <th>Nombre Producto</th>
                <th>Cantidad Inventario</th>
                {/* Encabezados */}
              </tr>
            </thead>
            <tbody>
              {productoData.Desgloce.map((item, index) => (
                <tr key={index}>
                  <td>{item.CantidadContenedor}</td>
                  <td>{item.Nombre}</td>
                  <td>{item.CantidadTotal}</td>
                  {/* Celdas */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default TableDesgloseShowProducto;
