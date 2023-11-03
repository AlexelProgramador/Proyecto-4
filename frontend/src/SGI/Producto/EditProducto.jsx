import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showProducto, updateProducto } from './HandlerProducto';

export const EditProducto = () => {
    const [producto, setProducto] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await updateProducto(id, producto);
            navigate('/show-producto');
            // Manejar la respuesta si es necesario
        } catch (error) {
            console.error('Error al actualizar el producto', error);
            // Manejar el error si es necesario
        }
    };

    return (
        <div>
            <h2>Editar Producto</h2>
            <div>
                <label htmlFor="NombreProducto">Nombre:</label>
                <input
                    type="text"
                    id="NombreProducto"
                    name="NombreProducto"
                    value={producto.NombreProducto || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="LugarProducto">Lugar:</label>
                <input
                    type="text"
                    id="LugarProducto"
                    name="LugarProducto"
                    value={producto.LugarProducto || ''}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleUpdate}>Actualizar Producto</button>
            {/* Mostrar otros detalles de la producto según sea necesario */}
        </div>
        
    );
};

export default EditProducto;
