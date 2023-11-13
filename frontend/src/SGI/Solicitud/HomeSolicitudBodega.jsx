import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeSolicitud } from './HandlerSolicitudBodega';

export const HomeSolicitudBodega = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const fetchData = async () => {
        try {
            const response = await homeSolicitud();
            setData(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleShow = (id) => {
        navigate(`/show-solicitud/${id}`);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>UUID es de prueba</th>
                        <th>Nombre Solicitud</th>
                        <th>Lugar Solicitud</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item._id}</td>
                            <td>{item.NombreSolicitud}</td>
                            <td>{item.LugarSolicitud}</td>
                            <td>
                                <button onClick={() => handleShow(item._id)}>Ver Más</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomeSolicitudBodega;
