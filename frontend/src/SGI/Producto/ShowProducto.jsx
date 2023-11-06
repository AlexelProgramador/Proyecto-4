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

            <h2>Desgloce de los Productos</h2>
            {producto.DesgloceProducto && producto.DesgloceProducto.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>Nombre Producto</th>
                        <th>Cantidad Inventario</th>
                        {/* Encabezados */}
                    </tr>
                </thead>
                <tbody>
                    {producto.DesgloceProducto.map((item, index) => (
                        <tr key={index}>
                            <td>{item.CajasProducto}</td>
                            <td>{item.NombreProducto}</td>
                            <td>{item.CantidadInventario}</td>
                            {/* Celdas */}
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
            <p>No hay datos de productdisponibles</p>
            )}

            <h2>ubicación de los Productos</h2>
            {producto.UbicacionProducto && producto.UbicacionProducto.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre Producto</th>
                            <th>Cantidad Inventario</th>
                            {/* Encabezados */}
                        </tr>
                    </thead>
                    <tbody>
                        {producto.UbicacionProducto.map((item, index) => (
                            <tr key={index}>
                                <td>{item.CajasProducto}</td>
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

export default ShowProducto;
