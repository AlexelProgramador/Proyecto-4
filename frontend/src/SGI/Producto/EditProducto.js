import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const EditProducto = () => {
    const [producto, setProducto] = useState({});
    const { id } = useParams();
    const url = `http://localhost:8000/api/producto/${id}/edit`; // Reemplaza con la URL de tu backend

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(url);
                setProducto(response.data.data);
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
            await axios.put(url, producto);
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
