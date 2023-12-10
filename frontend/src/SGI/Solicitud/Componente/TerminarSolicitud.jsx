import React from 'react';

export const TerminarSolicitud = ({ solicitud, handleinput, aceptar, rechazar, setModal }) => {
    console.log(solicitud.EstadoSolicitud);

    return(
    <div>
        {/* <div className='card shadow-card rounded-0 border border-0'> */}
            <div className='vw-100' style={{maxWidth:'700px'}}>
                <div className='h5 text-uppercase pb-2'>Solicitud #{solicitud._id.substring(0, 6)}</div>
                <div className='row justify-content-between'>
                    <p className='col-md-4'>{solicitud.NombreSolicitanteSolicitud}</p>
                    <p className='col-md-4'>{solicitud.NombreBotiquin}</p>
                    <p className='col-md-4'>{solicitud.FechaSolicitud}</p>
                </div>
                <div className='h5 text-uppercase pb-2'>Inventario</div>
                {solicitud.InventarioSolicitud && solicitud.InventarioSolicitud.length > 0 ? (
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
                            {solicitud.InventarioSolicitud.map((item, index) => (
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
                <div>

                {solicitud.EstadoSolicitud === "Aceptado" || solicitud.EstadoSolicitud === "Rechazado" ? (
                    <div className='text-end'>
                        <button className='btn me-2' onClick={() => setModal(false)}>Atras</button>
                    </div>
                ) : (
                    <div className='pt-2'>
                        <div className='form-floating pb-4'>
                            <textarea className='form-control'
                                //placeholder="Descripción del Producto"
                                name="ComentarioSolicitud"
                                value={solicitud.ComentarioSolicitud}
                                onChange={handleinput}
                                rows={4} // Aquí puedes especificar el número de filas que deseas mostrar
                                cols={50} // Aquí puedes especificar el número de columnas que deseas mostrar
                            />
                            <label htmlFor="">Comentarios:</label>
                        </div>
                        <div className='text-end'>
                            <button className='btn me-2' onClick={() => setModal(false)}>Atras</button>
                            <button className='btn me-2' onClick={() => aceptar(solicitud)}>Aceptar Solicitud</button>
                            <button className='btn ' onClick={() => rechazar(solicitud)}>Rechazar Solicitud</button>
                        </div>
                    </div>
                )} 
                </div>
            </div>
        </div>
    // </div>
    )
};

export default TerminarSolicitud;