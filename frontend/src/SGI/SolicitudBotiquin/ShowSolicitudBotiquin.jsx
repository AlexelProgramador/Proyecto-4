import React, { useState, useEffect } from 'react';

export const ShowSolicitudBotiquin = ({ setModal, retiro, setRetiroBotiquin }) => {

  return (
    <div>
      <div className='vw-100' style={{maxWidth:'700px'}}>
        <div className='h5 text-uppercase pb-2'>Retiro #{retiro._id.substring(0, 6)}</div>
        <div className='row justify-content-between'>
            <p className='col-md-4'>{retiro.NombreSolicitanteSolicitud}</p>
            <p className='col-md-4'>{retiro.NombreBotiquin}</p>
            <p className='col-md-4'>{retiro.FechaSolicitud}</p>
        </div>
        <div className='h5 text-uppercase pb-2'>Inventario</div>
        {retiro.InventarioSolicitud && retiro.InventarioSolicitud.length > 0 ? (
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
              {retiro.InventarioSolicitud.map((item, index) => (
                <tr key={index}>
                  <td>{item.NombreProducto}</td>
                  <td>{item.CantidadSolicitud}</td>
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
    </div>
  );
};

export default ShowSolicitudBotiquin;