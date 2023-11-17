import React, { useState, useEffect } from 'react';

export const DashboardBodega = () => {
    const aviso = [
        {nro: 0, tipo:'Producto por terminar', color: 'bg-warning'},
        {nro: 0, tipo:'Producto por vencer', color: 'bg-danger'},
        {nro: 0, tipo:'Solicitudes pendientes', color: 'bg-success'}
    ]
    return (
        <div>
            <div className='h5 text-uppercase pb-2'>Bienvenido Bodeguero</div>
            <div className='row'>
            {aviso.map((avi,index) => {
            return (
                <div className='col-md-4' key={index}>
                <div className='card shadow-card rounded-0 border border-0 bg-card'>
                    <div className='row text-center align-items-center mx-0'>
                        <div className={`col-3 m-0 text-white h4 py-4 ${avi.color}`}>{avi.nro}</div>
                        <div className='col-9 h6 m-0 text-uppercase'>{avi.tipo}</div>
                    </div>
                    <div className='p-0'>
                        <div className='table-responsive'>
                            <table className='table bg-white'>
                                <thead>
                                    <tr>
                                        <th className='px-3'>Nombre</th>
                                        <th className='px-3 text-end'>Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='px-3'></td>
                                        <td className='px-3 text-end'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='text-end p-2'>
                            <div className=''>
                            <button className='btn btn-xs btn-primary text-uppercase'>Ver mas <i class="fa-solid fa-angle-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                )
            })}
                
            </div>
        </div>
    );
};

export default DashboardBodega;