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
        <div className='card shadow-card rounded-0 border border-0'>
            <div className='card-body'>
                <div className='h5 text-uppercase pb-2'>Editar Botiquin</div>
                <form className='row'>                        
                    <div className='col-md-6 pb-4'>
                        <div className='form-floating'>
                            <input className='form-control'
                                type="text"
                                id="NombreBotiquin"
                                name="NombreBotiquin"
                                value={botiquin.NombreBotiquin || ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="NombreBotiquin">Nombre:</label>
                        </div>
                    </div>
                    <div className='col-md-6 pb-4'>
                        <div className='form-floating'>
                            <input className='form-control'
                                type="text"
                                id="LugarBotiquin"
                                name="LugarBotiquin"
                                value={botiquin.LugarBotiquin || ''}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="LugarBotiquin">Lugar:</label>
                        </div>
                    </div>
                    <div className='col-12 pb-4'>
                        <button className='btn btn-primary' onClick={handleUpdate}>Actualizar Botiquin</button>
                    </div>
                </form>
                <div className='h5 text-uppercase pb-2'>Inventario</div>
                {botiquin.InventarioBotiquin && botiquin.InventarioBotiquin.length > 0 ? (
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
                </div>
                ) : (
                    <p>No hay datos de inventario disponibles</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default EditBotiquin;
