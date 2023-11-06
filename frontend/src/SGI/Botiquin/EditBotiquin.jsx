import React, { useState, useEffect } from 'react';
import { showBotiquin, updateBotiquin } from './HandlerBotiquin';
import { useParams, useNavigate } from 'react-router-dom';

export const EditBotiquin = () => {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBotiquin({ ...botiquin, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await updateBotiquin(id, botiquin);
            navigate('/show-botiquin');
            // Manejar la respuesta si es necesario
        } catch (error) {
            console.error('Error al actualizar la botiquin', error);
            // Manejar el error si es necesario
        }
    };

    return (
        <div>
            <h2>Editar Botiquin</h2>
            <div>
                <label htmlFor="NombreBotiquin">Nombre:</label>
                <input
                    type="text"
                    id="NombreBotiquin"
                    name="NombreBotiquin"
                    value={botiquin.NombreBotiquin || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="LugarBotiquin">Lugar:</label>
                <input
                    type="text"
                    id="LugarBotiquin"
                    name="LugarBotiquin"
                    value={botiquin.LugarBotiquin || ''}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleUpdate}>Actualizar Botiquin</button>
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

export default EditBotiquin;
