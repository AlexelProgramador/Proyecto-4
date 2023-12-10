import React from 'react';


export const TableAsignacionShowProducto = ({productoData}) => {

  return (
    <div>
      {productoData.Ubicacion && productoData.Ubicacion.length > 0 ? (
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>Lugar Asignado</th>
              <th>Cantidad Asignada</th>
              <th>Fecha Proceso</th>
              {/* Encabezados */}
            </tr>
          </thead>
          <tbody>
            {productoData.Ubicacion.map((item, index) => (
              <tr key={index}>
                <td>{item.NombreUbicacion}</td>
                <td>{item.CantidadAsignada}</td>
                <td>{item.FechaProceso}</td>
                {/* Celdas */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
          <p>No hay datos de inventario disponibles</p>
      )}
    </div>
  );
};

export default TableAsignacionShowProducto;
