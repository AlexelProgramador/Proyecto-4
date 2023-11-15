import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBodega, homeBodega } from './HandlerBodega';

export const DashboardBodega = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const fetchData = async () => {
        try {
            const response = await homeBodega();
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
            await deleteBodega(id);
            fetchData();
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-bodega/${id}`); // Cambia '/edit-bodega' con la ruta de edición deseada
    };

    const handleShow = (id) => {
        navigate(`/show-bodega/${id}`);
    };

    return (
        <div>
            <div className='h5 text-uppercase pb-2'>Bienvenido Bodeguero</div>
            <div className='row'>
                <div className='col-md-4'>
                    <div className='card shadow-card rounded-0 border border-0 bg-card'>
                        <div className='row text-center align-items-center mx-0'>
                            <div className='col-3 bg-danger m-0 text-white h4 py-4'>1</div>
                            <div className='col-9 h6 m-0 text-uppercase'>Producto por vencer</div>
                        </div>
                        <div className='p-0'>
                            <div className='table-responsive'>
                                <table className='table bg-white'>
                                    <thead>
                                        <tr>
                                            <th className='px-3'>Nombre</th>
                                            <th className='px-3'>Cantidad</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item) => (
                                            <tr key={item.id}>
                                                <td className='px-3'>{item.NombreBodega}</td>
                                                <td className='px-3'>{item.LugarBodega}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='row p-2'>
                                <div className='col align-self-end'>
                                <button className='btn btn-primary'>Ver mas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBodega;
