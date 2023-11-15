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
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='h5 text-uppercase pb-2'>Solicitudes</div>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>UUID es de prueba</th>
                                    <th>Nombre Solicitante</th>
                                    <th>Lugar Solicitud</th>
                                    <th>Cantidad a Pedir</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item._id}</td>
                                        <td>{item.NombreSolicitanteSolicitud}</td>
                                        <td>{item.LugarBotiquin}</td>
                                        <td>{item.InventarioBodega.length}</td>
                                        <td>
                                            <button onClick={() => handleShow(item._id)}>Ver Más</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>    
        </div>
    );
};

export default HomeSolicitudBodega;
