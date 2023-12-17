import React from 'react';

export const ComponenteDashboardAdministrador = ({datosPendiente, datosPocasUnidades}) => {
    const aviso = [
        {nro: datosPocasUnidades.length, tipo:'Producto por terminar', color: 'bg-warning', th1: 'Nombre', th2:'CantidadTotal'},
        {nro: 0, tipo:'Producto por vencer', color: 'bg-danger', th1: 'Nombre', th2:'Fecha'},
        {nro: datosPendiente.length, tipo:'Solicitudes pendientes', color: 'bg-success', th1: 'Destino', th2: 'Fecha', th3: datosPendiente.NombreBodega, th4: datosPendiente.FechaSolicitud}
    ]

    // console.log('datosUnidades',datosPocasUnidades)
    // console.log('datosPendiente',datosPendiente)

    return (
        <div>
            <div className='h5 text-uppercase pb-2'>Bienvenido Administrador</div>
            <div className='row'>
            {aviso.map((avi,index) => {
            return (
                <div className='col-md-4' key={index}>
                <div className='card shadow-card rounded-0 border border-0 bg-card mb-2'>
                    <div className='row text-center align-items-center mx-0'>
                        <div className={`col-3 m-0 text-white h4 py-4 ${avi.color}`}>{avi.nro !== null ? avi.nro : 'Cargando...'}</div>
                        <div className='col-9 h6 m-0 text-uppercase'>{avi.tipo}</div>
                    </div>
                    <div className='p-0'>
                        <div className='table-responsive'>
                            <table className='table bg-white'>
                                <thead>
                                    <tr>
                                        <th className='px-3'>{avi.th1}</th>
                                        <th className='px-3 text-end'>{avi.th2}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {avi.nro > 0 && avi.tipo === 'Producto por terminar' && (
                                    datosPocasUnidades.map((unidad, idx) => (
                                    <tr key={idx}>
                                        <td className='px-3'>{unidad.Nombre}</td>
                                        <td className='px-3 text-end'>{unidad.CantidadTotal}</td>
                                    </tr>
                                    ))
                                )}
                                {avi.nro > 0 && avi.tipo === 'Producto por vencer' && (
                                    datosPocasUnidades.map((unidad, idx) => (
                                    <tr key={idx}>
                                        <td className='px-3'>{unidad.Nombre}</td>
                                        <td className='px-3 text-end'>{unidad.CantidadTotal}</td>
                                    </tr>
                                    ))
                                )}
                                {avi.nro > 0 && avi.tipo === 'Solicitudes pendientes' && (
                                    datosPendiente.map((unidad, idx) => (
                                    <tr key={idx}>
                                        <td className='px-3'>{unidad.NombreBodega}</td>
                                        <td className='px-3 text-end'>{unidad.FechaSolicitud}</td>
                                    </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                        {/* <div className='text-end p-2'>
                            <div className=''>
                            <button className='btn btn-xs btn-primary text-uppercase'>Ver mas <i className="fa-solid fa-angle-right"></i></button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
                )
            })}
                
            </div>
        </div>
    );
};
export default ComponenteDashboardAdministrador;
