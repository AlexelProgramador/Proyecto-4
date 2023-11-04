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
            <table>
                <thead>
                    <tr>
                        <th>UUID es de prueba</th>
                        <th>Nombre Producto</th>
                        <th>Lugar Producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item._id}</td>
                            <td>{item.NombreProducto}</td>
                            <td>{item.LugarProducto}</td>
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

export default HomeProducto;