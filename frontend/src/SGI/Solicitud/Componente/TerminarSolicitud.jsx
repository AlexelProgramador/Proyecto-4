import React from 'react';

export const TerminarSolicitud = ({ solicitud, handleinput, aceptar, rechazar }) => {
    return(
    <div>
        <div className='card shadow-card rounded-0 border border-0'>
            <div className='card-body'>
                <div className='h5 text-uppercase pb-2'>Solicitud</div>
                <p>{solicitud._id}</p>
                <div className='h5 text-uppercase pb-2'>Inventario</div>
                {solicitud.InventarioSolicitud && solicitud.InventarioSolicitud.length > 0 ? (
                <div className='table-responsive'>
                    <table>
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
                
                <div>
                <button className='btn btn-success' onClick={() => aceptar(solicitud._id)}>Aceptar Solicitud</button>
                <button className='btn btn-danger' onClick={() => rechazar(solicitud._id)}>Rechazar Solicitud</button>
                </div>            
            </div>
        </div>
    </div>
    )
};

export default TerminarSolicitud;