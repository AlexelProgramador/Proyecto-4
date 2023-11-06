import React, { useState, useEffect } from 'react';
import { showBotiquin } from './HandlerBotiquin';
import { useParams, useNavigate } from 'react-router-dom';

export const ShowBotiquin = () => {
    const [botiquin, setBotiquin] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const url = `http://localhost:8000/api/botiquin/${id}/edit`; // Reemplaza con la URL de tu backend

    useEffect(() => {
        const fetchBotiquin = async () => {
            try {
                const data = await showBotiquin(id);
                setBotiquin(data);
            } catch (error) {
                console.error('Error al obtener la información de la botiquin', error);
            }
        };

        fetchBotiquin();
    }, [url]);

    return (
        <div>
            <h2>Botiquin</h2>
            <h4>{botiquin._id}</h4>
            <h3>Inventario</h3>
            {botiquin.InventarioBotiquin && botiquin.InventarioBotiquin.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre Producto</th>
                            <th>Cantidad Inventario</th>
                            {/* Encabezados */}
                        </tr>
                    </thead>
                    <tbody>
                        {botiquin.InventarioBotiquin.map((item, index) => (
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

export default ShowBotiquin;
