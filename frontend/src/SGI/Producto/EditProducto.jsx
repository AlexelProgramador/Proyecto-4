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

    // Nuevo estado para rastrear los datos del nuevo desgloce de producto
    const [nuevoDesgloce, setNuevoDesgloce] = useState({
        CantidadContenedorProducto: 0,
        CantidadTotal: 0,
        ValorTotal: 0,
        FechaVencimientoProducto: '',
        EstadoProducto: '',
    });

    // Función para agregar un nuevo desgloce
    const handleAgregarDesgloce = () => {
        setProducto({
            ...producto,
            DesgloceProducto: [...(producto.DesgloceProducto || []), nuevoDesgloce],
        });

        // Reiniciar los campos del nuevo desgloce
        setNuevoDesgloce({
            CantidadContenedorProducto: 0,
            CantidadTotal: 0,
            ValorTotal: 0,
            FechaVencimientoProducto: '',
            EstadoProducto: '',
        });
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

            <h2>Desgloce de los Productos</h2>
            {producto.DesgloceProducto && producto.DesgloceProducto.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Cantidad Contenedor Producto</th>
                            <th>Cantidad Total</th>
                            <th>Valor Total</th>
                            <th>Fecha Vencimiento Producto</th>
                            <th>Estado Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {producto.DesgloceProducto.map((item, index) => (
                            <tr key={index}>
                                <td>{item.CantidadContenedorProducto}</td>
                                <td>{item.CantidadTotal}</td>
                                <td>{item.ValorTotal}</td>
                                <td>{item.FechaVencimientoProducto}</td>
                                <td>{item.EstadoProducto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos de producto disponibles</p>
            )}

            <h2>Agregar Nuevo Desgloce de Producto</h2>
            <div>
                <label htmlFor="CantidadContenedorProducto">Cantidad Contenedor Producto:</label>
                <input
                    type="text"
                    id="CantidadContenedorProducto"
                    name="CantidadContenedorProducto"
                    value={nuevoDesgloce.CantidadContenedorProducto}
                    onChange={(e) => setNuevoDesgloce({ ...nuevoDesgloce, CantidadContenedorProducto: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="CantidadTotal">Cantidad Total:</label>
                <input
                    type="text"
                    id="CantidadTotal"
                    name="CantidadTotal"
                    value={nuevoDesgloce.CantidadTotal}
                    onChange={(e) => setNuevoDesgloce({ ...nuevoDesgloce, CantidadTotal: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="ValorTotal">Valor Total:</label>
                <input
                    type="text"
                    id="ValorTotal"
                    name="ValorTotal"
                    value={nuevoDesgloce.ValorTotal}
                    onChange={(e) => setNuevoDesgloce({ ...nuevoDesgloce, ValorTotal: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="FechaVencimientoProducto">Fecha Vencimiento Producto:</label>
                <input
                    type="text"
                    id="FechaVencimientoProducto"
                    name="FechaVencimientoProducto"
                    value={nuevoDesgloce.FechaVencimientoProducto}
                    onChange={(e) => setNuevoDesgloce({ ...nuevoDesgloce, FechaVencimientoProducto: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="EstadoProducto">Estado Producto:</label>
                <input
                    type="text"
                    id="EstadoProducto"
                    name="EstadoProducto"
                    value={nuevoDesgloce.EstadoProducto}
                    onChange={(e) => setNuevoDesgloce({ ...nuevoDesgloce, EstadoProducto: e.target.value })}
                />
            </div>
            <button onClick={handleAgregarDesgloce}>Agregar Desgloce</button>
            <h2>Ubicación de los Productos</h2>
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
        {/* Mostrar otros detalles de la producto según sea necesario */}
    </div>
);
};

export default EditProducto;
