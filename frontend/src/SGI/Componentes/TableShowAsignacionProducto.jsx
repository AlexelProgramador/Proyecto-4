import React from 'react';
import DataTableSM from './DataTableSM';

export const TableAsignacionShowProducto = ({productoData}) => {
  let columns = [];
  let data = [];

  if (productoData.Ubicacion && productoData.Ubicacion.length > 0) {
      columns = [
          { label: 'Tipo Proceso', key: 'proceso' },
          { label: 'Ubicación Producto', key: 'ubi' },
          { label: 'Cantidad Asignada', key: 'cant' },
          { label: 'Fecha Proceso', key: 'fecha' },
      ];
      data = productoData.Ubicacion.map((item) => ({
        proceso: item.TipoAsignacion,
        ubi: item.NombreUbicacion,
        cant: item.CantidadAsignada,
        fecha: item.FechaProceso              
      }));
    }
  
  return (
    <div>
      {productoData.Ubicacion && productoData.Ubicacion.length > 0 ? (
      <div>
        <DataTableSM data={data} columns={columns}/>
      </div>
      ) : (
          <p>No hay datos de inventario disponibles</p>
      )}
    </div>
  );
};

export default TableAsignacionShowProducto;
