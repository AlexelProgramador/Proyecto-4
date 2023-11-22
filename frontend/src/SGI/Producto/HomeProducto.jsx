import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProducto, homeProducto } from './HandlerProducto';

export const HomeProducto = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const fetchData = async () => {
        try {
            const response = await homeProducto();
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
            await deleteProducto(id);
            fetchData();
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-producto/${id}`); //Ruta para la edición de producto
    };
    
    const handleShow = (id) => {
        navigate(`/show-producto/${id}`); //Ruta para la edición de producto
    };
    return (
        <div>
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between pb-2'>
                        <div className='h5 text-uppercase'>Productos</div>
                        <div className=''><button className='btn btn-success'>Crear <i class="fa-solid fa-plus"></i></button></div>
                    </div>
                    <div className='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>UUID es de prueba</th>
                                <th>Nombre Producto</th>
                                <th>Cantidad Total Producto</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item._id}</td>
                                    <td>{item.NombreProducto}</td>
                                    <td>{item.TotalProducto}</td>
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
        </div>
    );
};

export default HomeProducto;