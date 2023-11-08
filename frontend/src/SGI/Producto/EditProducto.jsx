import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showProducto, updateProducto } from './HandlerProducto';
import { NewDesgloce } from './Componentes/NewDesgloce'; 

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
                <label htmlFor="MarcaProducto">Marca:</label>
                <input
                    type="text"
                    id="MarcaProducto"
                    name="MarcaProducto"
                    value={producto.MarcaProducto || ''}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="DescripcionProducto">Descripcion:</label>
                <textarea
                    placeholder="Descripción del Producto"
                    name="DescripcionProducto"
                    value={producto.DescripcionProducto || ''}
                    onChange={handleInputChange}
                    rows={4} // Aquí puedes especificar el número de filas que deseas mostrar
                    cols={50} // Aquí puedes especificar el número de columnas que deseas mostrar
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
                            <th>Cantidad Actual</th>
                            <th>Valor Total</th>
                            <th>Fecha Vencimiento Producto</th>
                            <th>Estado Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {producto.DesgloceProducto.map((item, index) => (
                            <tr key={index}>
                                <td>{item.CantidadContenedorProducto}</td>
                                <td>{item.CantidadTotalProducto}</td>
                                <td>{item.CantidadActualProducto}</td>
                                <td>{item.ValorTotalProducto}</td>
                                <td>{item.FechaVencimientoProducto}</td>
                                <td>{item.EstadoProducto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos de producto disponibles</p>
            )}
            <NewDesgloce setProducto={setProducto} producto ={producto}/>
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
