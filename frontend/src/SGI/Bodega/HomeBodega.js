import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const HomeBodega = () => {
    const [data, setData] = useState([]);
    const url_test = "http://127.0.0.1:8000/api";
    
    const fetchData = async () => {
        try {
            const response = await axios.get(url_test + "/bodegas");
            setData(response.data);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${url_test}/bodega/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>UUID es de prueba</th>
                        <th>Nombre Bodega</th>
                        <th>Lugar Bodega</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item._id}</td>
                            <td>{item.NombreBodega}</td>
                            <td>{item.LugarBodega}</td>
                            <td>
                                <button>Ver Más</button>
                                <button>Editar</button>
                                <button onClick={() => handleDelete(item._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomeBodega;