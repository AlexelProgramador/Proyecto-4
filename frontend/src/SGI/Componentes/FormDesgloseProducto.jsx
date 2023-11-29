import React from 'react';
import { NewDesgloce } from '../Producto/Componentes/NewDesgloce'; 

export const FormDesgloseProducto = ({productoData, cargandoDesgloce}) => {

  return (
    <div>
      {productoData.Desgloce.length > 0 ? (
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Cantidad Contenedor Producto</th>
                <th>Cantidad Total</th>
                <th>Valor Total</th>
                <th>Fecha Vencimiento Producto</th>
                <th>Estado Producto</th>
              </tr>
            </thead>
            <tbody>
              {productoData.map((item, index) => (
                <tr key={index}>
                  <td>{item.CantidadContenedorProducto}</td>
                  <td>{item.CantidadTotalProducto}</td>
                  <td>{item.ValorTotalProducto}</td>
                  <td>{item.FechaVencimientoProducto}</td>
                  <td>{item.EstadoProducto}</td>
                </tr>
                ))
              }
            </tbody>
          </table>
        </div>  
        ) : 
          <p>No hay datos de producto disponibles</p>
      }
      {cargandoDesgloce ? <p> CArgando datos..</p> : <NewDesgloce productoData ={productoData}/>}
    </div>
  );
};

export default FormDesgloseProducto;
