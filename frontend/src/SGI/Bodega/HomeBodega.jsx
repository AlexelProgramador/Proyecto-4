import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBodega, homeBodega } from './HandlerBodega';

export const HomeBodega = () => {
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
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <table className='table'>
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
                                        <div className='btn-group btn-group-sm'>
                                            <button className='btn btn-primary' onClick={() => handleShow(item._id)}><i class="fa-solid fa-eye"></i></button>
                                            <button className='btn btn-warning' onClick={() => handleEdit(item._id)}><i class="fa-solid fa-pen"></i></button>
                                            <button className='btn btn-danger' onClick={() => handleDelete(item._id)}><i class="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HomeBodega;
