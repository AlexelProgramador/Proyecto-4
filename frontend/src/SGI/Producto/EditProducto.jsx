import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showProducto, updateProducto } from './HandlerProducto';
import { NewDesgloce } from './Componentes/NewDesgloce'; 
import NewAsignacion from './Componentes/NewAsignacion';

export const EditProducto = () => {
    const [producto, setProducto] = useState({});
    const [cargandoAsignacion, setCargandoAsignacion] = useState(true);
    const [cargandoDesgloce, setCargandoDesgloce] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    //const url = `http://localhost:8000/api/producto/${id}`; // Reemplaza con la URL de tu backend
    
    const fetchProducto = async () => {
        try {
            const data = await showProducto(id);
            setProducto(data);
            
        } catch (error) {
            console.error('Error al obtener la información del producto', error);
        } finally {
            setCargandoDesgloce(false);
            setCargandoAsignacion(false);
        }
    };

    useEffect(() => {
        fetchProducto();
    }, []);

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
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='h5 text-uppercase pb-2'>Editar Producto</div>
                    <div className='row'>
                        <div className='col-md-6 pb-4'>
                            <div className='form-floating'>
                                <input className='form-control'
                                    type="text"
                                    id="NombreProducto"
                                    name="NombreProducto"
                                    value={producto.NombreProducto || ''}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="NombreProducto">Nombre:</label>
                            </div>
                        </div>
                        <div className='col-md-6 pb-4'>
                            <div className='form-floating'>
                                <input className='form-control'
                                    type="text"
                                    id="MarcaProducto"
                                    name="MarcaProducto"
                                    value={producto.MarcaProducto || ''}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="MarcaProducto">Marca:</label>
                            </div>
                        </div>
                        <div className='col-12 pb-4'>  
                            <div className='form-floating'>
                                <textarea className='form-control'
                                    placeholder="Descripción del Producto"
                                    name="DescripcionProducto"
                                    value={producto.DescripcionProducto || ''}
                                    onChange={handleInputChange}
                                    rows={4} // Aquí puedes especificar el número de filas que deseas mostrar
                                    cols={50} // Aquí puedes especificar el número de columnas que deseas mostrar
                                />
                                <label>Descripción:</label>
                            </div>
                        </div>
                        <div className='col-12 pb-4 d-flex justify-content-between'>  
                            <label htmlFor="TotalProducto">Total Producto: {producto.TotalProducto}</label>
                            <label htmlFor="TotalProducto">Total Asignado a Bodega: {producto.TotalAsignado}</label>
                            <button className='btn btn-primary' onClick={handleUpdate}>Actualizar Producto</button>
                        </div>

                        <div className='h5 pb-2'>Desgloce de los Productos</div>
                        {producto.DesgloceProducto && producto.DesgloceProducto.length > 0 ? (
                            <div className='table-responsive'>
                                <table className='table'>
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
                                                <td>{item.CantidadTotalProducto}</td>
                                                <td>{item.ValorTotalProducto}</td>
                                                <td>{item.FechaVencimientoProducto}</td>
                                                <td>{item.EstadoProducto}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>  
                        ) : (
                            <p>No hay datos de producto disponibles</p>
                        )}
                        {cargandoDesgloce ? <p> CArgando datos..</p> : <NewDesgloce producto ={producto}/>}
                        <div className='h5 pb-2'>Ubicación de los Productos</div>
                    {producto.UbicacionProducto && producto.UbicacionProducto.length > 0 ? (
                        <div className='table-responsive'>
                            <table className='table'>
                            <thead>
                                <tr>
                                    <th>Tipo de Proceso</th>
                                    <th>Ubicación Producto</th>
                                    <th>Cantidad Asignada</th>
                                    <th>Fecha Proceso Producto</th>
                                    {/* Encabezados */}
                                </tr>
                            </thead>
                            <tbody>
                                {producto.UbicacionProducto.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.TipoProcesoProducto}</td>
                                        <td>{item.NombreUbicacionBodega}</td>
                                        <td>{item.CantidadAsignadaProducto}</td>
                                        <td>{item.FechaProcesoProducto}</td>
                                        {/* Celdas */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    ) : (
                        <p>No hay datos de inventario disponibles</p>
                    )}
                    {cargandoAsignacion ? <p> CArgando datos..</p> : <NewAsignacion desgloseProducto = {producto.DesgloceProducto}/>}
                    {/* Mostrar otros detalles de la producto según sea necesario */}
                </div>
            </div>
        </div>
    </div>
);};

export default EditProducto;
