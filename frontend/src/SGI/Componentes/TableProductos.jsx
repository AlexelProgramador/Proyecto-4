import React from 'react';
import DataTable from './DataTable';

export const TablaProductos = ({almacenamientoData}) => {
  let columns = [];
  let data = [];

  columns = [
    { label: 'Nombre Producto', key: 'nombre' },
    { label: 'Cantidad Inventario', key: 'cant' }
  ];
  data = almacenamientoData.Inventario.map((item) => ({
    nombre: item.NombreProducto,
    cant: item.CantidadInventario                
  }));
  
  return (
    <div>
      <DataTable data={data} columns={columns}/>
    </div>
  );
};

export default TablaProductos;
