import React from 'react';
import NewAsignacion from '../Producto/Componentes/NewAsignacion';

export const FormAsignacionProducto = ({productoData, cargandoAsignacion}) => {
  return (
    <div>
      {productoData.Ubicacion && productoData.Ubicacion.length > 0 ? (
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Tipo de Proceso</th>
                <th>Ubicación Producto</th>
                <th>Cantidad Asignada</th>
                <th>Fecha Proceso Asignación</th>
                {/* Encabezados */}
              </tr>
            </thead>
            <tbody>
              {productoData.Ubicacion.map((item, index) => (
                <tr key={index}>
                  <td>{item.TipoAsignacion}</td>
                  <td>{item.NombreUbicacion}</td>
                  <td>{item.CantidadAsignada}</td>
                  <td>{item.FechaProceso}</td>
                  {/* Celdas */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : 
          <p>No hay datos de inventario disponibles</p>
      }
      {cargandoAsignacion ? <p> CArgando datos..</p> : <NewAsignacion desgloseProducto = {productoData.Desgloce}/>}
    </div>
  );
};

export default FormAsignacionProducto;
