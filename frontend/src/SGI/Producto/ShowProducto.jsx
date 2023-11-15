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
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='h5 text-uppercase pb-2'>Producto {producto.NombreProducto}</div>
                    <p>{producto._id}</p>
                    <p>{producto.LugarProducto}</p>

                    <div className='h5 pb-2'>Desgloce de los Productos</div>
                    {producto.DesgloceProducto && producto.DesgloceProducto.length > 0 ? (
                    <div className='table-responsive'>
                        <table className='table'>
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
                    </div>
                    ) : (
                    <p>No hay datos de producto disponibles</p>
                    )}

                    <div className='h5 pb-2'>Ubicación de los Productos</div>
                    {producto.UbicacionProducto && producto.UbicacionProducto.length > 0 ? (
                    <div className='table-responsive'>
                        <table className='table'>
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
                    </div>
                    ) : (
                        <p>No hay datos de inventario disponibles</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowProducto;
