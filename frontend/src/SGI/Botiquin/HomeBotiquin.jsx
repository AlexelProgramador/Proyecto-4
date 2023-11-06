import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBotiquin, homeBotiquin } from './HandlerBotiquin';

export const HomeBotiquin = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const fetchData = async () => {
        try {
            const response = await homeBotiquin();
            setData(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBotiquin(id);
            fetchData();
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-botiquin/${id}`); // Cambia '/edit-botiquin' con la ruta de edición deseada
    };

    const handleShow = (id) => {
        navigate(`/show-botiquin/${id}`);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>UUID es de prueba</th>
                        <th>Nombre Botiquin</th>
                        <th>Lugar Botiquin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item._id}</td>
                            <td>{item.NombreBotiquin}</td>
                            <td>{item.LugarBotiquin}</td>
                            <td>
                                <button onClick={() => handleShow(item._id)}>Ver Más</button>
                                <button onClick={() => handleEdit(item._id)}>Editar</button>
                                <button onClick={() => handleDelete(item._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomeBotiquin;
