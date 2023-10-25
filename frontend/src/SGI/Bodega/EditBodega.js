import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const EditBodega = () => {
    const [bodega, setBodega] = useState({});
    const { id } = useParams();
    const url = `http://localhost:8000/api/bodega/${id}/edit`; // Reemplaza con la URL de tu backend

    useEffect(() => {
        const fetchBodega = async () => {
            try {
                const response = await axios.get(url);
                setBodega(response.data.data);
            } catch (error) {
                console.error('Error al obtener la información de la bodega', error);
            }
        };

        fetchBodega();
    }, [url]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBodega({ ...bodega, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(url, bodega);
            // Manejar la respuesta si es necesario
        } catch (error) {
            console.error('Error al actualizar la bodega', error);
            // Manejar el error si es necesario
        }
    };

    return (
        <div>
            <h2>Editar Bodega</h2>
            <div>
                <label htmlFor="NombreBodega">Nombre:</label>
                <input
                    type="text"
                    id="NombreBodega"
                    name="NombreBodega"
                    value={bodega.NombreBodega || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="LugarBodega">Lugar:</label>
                <input
                    type="text"
                    id="LugarBodega"
                    name="LugarBodega"
                    value={bodega.LugarBodega || ''}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleUpdate}>Actualizar Bodega</button>
            <h3>Inventario</h3>
            {bodega.InventarioBodega && bodega.InventarioBodega.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre Producto</th>
                            <th>Cantidad Inventario</th>
                            {/* Encabezados */}
                        </tr>
                    </thead>
                    <tbody>
                        {bodega.InventarioBodega.map((item, index) => (
                            <tr key={index}>
                                <td>{item.prueba}</td>
                                <td>{item.NombreProducto}</td>
                                <td>{item.CantidadInventario}</td>
                                {/* Celdas */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos de inventario disponibles</p>
            )}
        </div>
        
    );
};

export default EditBodega;
