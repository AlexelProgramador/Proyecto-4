import React, { useState, useEffect } from 'react';
import { showBodega } from './HandlerBodega';
import { useParams, useNavigate } from 'react-router-dom';

export const ShowBodega = () => {
    const [bodega, setBodega] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const url = `http://localhost:8000/api/bodega/${id}/edit`; // Reemplaza con la URL de tu backend

    useEffect(() => {
        const fetchBodega = async () => {
            try {
                const data = await showBodega(id);
                setBodega(data);
            } catch (error) {
                console.error('Error al obtener la información de la bodega', error);
            }
        };

        fetchBodega();
    }, [url]);

    return (
        <div>
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='h5 text-uppercase pb-2'>Bodega</div>
                    <p>{bodega._id}</p>
                    <div className='h5 text-uppercase pb-2'>Inventario</div>
                    {bodega.InventarioBodega && bodega.InventarioBodega.length > 0 ? (
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
                                {bodega.InventarioBodega.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.prueba}</td>
                                        <td>{item.NombreProducto}</td>
                                        <td>{item.CantidadInventario}</td>
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
        </div>
    );
};

export default ShowBodega;
