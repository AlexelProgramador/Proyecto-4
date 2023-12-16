import React from 'react';
import DataTableSM from '../Componentes/DataTableSM';

export const TableDesgloseShowProducto = ({productoData}) => {
  let columns = [];
  let data = [];

  columns = [
    { label: 'Nombre Desgloce', key: 'nombre' },
    { label: 'Cantidad Contenedor', key: 'cant1' },
    { label: 'Cantidad Total', key: 'cant' },
    { label: 'Valor Total', key: 'valor' },
    { label: 'Vencimiento Desglose', key: 'fecha' },
    { label: 'Estado Producto', key: 'est' },
  ];
  data = productoData.Desgloce.map((item) => ({
    nombre: item.Nombre,
      cant1: item.CantidadContenedor,
      cant: item.CantidadTotal +' Unidades',
      valor: '$' + item.ValorTotal,
      fecha: item.FechaVencimiento,
      est: item.Estado                    
  }));
  
  return (
    <div className='pb-2'>
      <DataTableSM data={data} columns={columns}/>
    </div>
  );
};

export default TableDesgloseShowProducto;
