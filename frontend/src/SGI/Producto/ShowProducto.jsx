import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showProducto } from './HandlerProducto';

export const ShowProducto = () => {
    const [producto, setProducto] = useState({});
    const { id } = useParams();
    //const navigate = useNavigate();
    const url = `http://localhost:8000/api/producto/${id}`; // Reemplaza con la URL de tu backend

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const data = await showProducto(id);
                setProducto(data);
            } catch (error) {
                console.error('Error al obtener la información del producto', error);
            }
        };

        fetchProducto();
    }, [url]);

    return (
        <div>
            <h1>{producto._id}</h1>
            <h2>{producto.NombreProducto}</h2>
            <h2>{producto.LugarProducto}</h2>
        </div>
        
    );
};

export default ShowProducto;
