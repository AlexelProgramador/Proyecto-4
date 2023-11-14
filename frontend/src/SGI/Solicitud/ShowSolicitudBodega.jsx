import React, { useState, useEffect } from 'react';
import { showSolicitud } from './HandlerSolicitudBodega';
import { useParams, useNavigate } from 'react-router-dom';

export const ShowSolicitudBodega = () => {
    const [solicitud, setSolicitud] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    //const url = `http://localhost:8000/api/solicitud/${id}/edit`; // Reemplaza con la URL de tu backend

    const fetchSolicitud = async () => {
        try {
            const data = await showSolicitud(id);
            setSolicitud(data);
        } catch (error) {
            console.error('Error al obtener la información de la solicitud', error);
        }
    };
    useEffect(() => {
        fetchSolicitud();
    }, []);

    return (
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
                                <td>{item.prueba}</td>
                                <td>{item.NombreProducto}</td>
                                <td>{item.CantidadInventario}</td>
                                {/* Celdas */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos de inventario disponibles</p>
            )}
        </div>
        
    );
};

export default ShowSolicitudBodega;
