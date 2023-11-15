import React from 'react';

export const TerminarSolicitud = ({ solicitud, handleinput, aceptar, rechazar }) => {
    return(
      <div>
            <h2>Solicitud</h2>
            <h4>{solicitud._id}</h4>
            <h3>Inventario</h3>
            {solicitud.InventarioSolicitud && solicitud.InventarioSolicitud.length > 0 ? (
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
                                <td>{item.CantidadAsignadaProducto}</td>
                                {/* Celdas */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos de inventario disponibles</p>
            )}
            <div>
                <textarea className='form-control'
                    //placeholder="Descripción del Producto"
                    name="ComentarioSolicitud"
                    value={solicitud.ComentarioSolicitud}
                    onChange={handleinput}
                    rows={4} // Aquí puedes especificar el número de filas que deseas mostrar
                    cols={50} // Aquí puedes especificar el número de columnas que deseas mostrar
                />
            </div>
            
            <div>
            <button onClick={() => aceptar(solicitud._id)}>Aceptar Solicitud</button>
            <button onClick={() => rechazar(solicitud._id)}>Rechazar Solicitud</button>
            </div>            
        </div>
    )
};

export default TerminarSolicitud;