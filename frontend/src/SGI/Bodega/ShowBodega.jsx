import React, { useState, useEffect } from 'react';
import { showBodega, updateBodega } from './HandlerBodega';
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
            <h2>Bodega</h2>
            <h4>{bodega._id}</h4>
            <h3>Inventario</h3>
            {bodega.InventarioBodega && bodega.InventarioBodega.length > 0 ? (
                <table>
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
            ) : (
                <p>No hay datos de inventario disponibles</p>
            )}
        </div>
        
    );
};

export default ShowBodega;
