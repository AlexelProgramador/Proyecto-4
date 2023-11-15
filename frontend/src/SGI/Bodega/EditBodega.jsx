import React, { useState, useEffect } from 'react';
import { showBodega, updateBodega } from './HandlerBodega';
import { useParams, useNavigate } from 'react-router-dom';

export const EditBodega = () => {
    const [bodega, setBodega] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const url = `http://localhost:8000/api/bodega/${id}/edit`; // Reemplaza con la URL de tu backend

    useEffect(() => {
        const fetchBodega = async () => {
            try {
                const data = await showBodega(id);
                setBodega(data);
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
            await updateBodega(id, bodega);
            navigate('/show-bodega');
            // Manejar la respuesta si es necesario
        } catch (error) {
            console.error('Error al actualizar la bodega', error);
            // Manejar el error si es necesario
        }
    };

    return (
        <div>
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='h5 text-uppercase pb-2'>Editar Bodega</div>
                    <form className='row'>                        
                        <div className='col-md-6 pb-4'>
                            <div className='form-floating'>
                                <input className='form-control'
                                    type="text"
                                    id="NombreBodega"
                                    name="NombreBodega"
                                    value={bodega.NombreBodega || ''}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="NombreBodega">Nombre:</label>
                            </div>
                        </div>                        
                        <div className='col-md-6 pb-4'>
                            <div className='form-floating'>
                                <input className='form-control'
                                    type="text"
                                    id="LugarBodega"
                                    name="LugarBodega"
                                    value={bodega.LugarBodega || ''}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="LugarBodega">Lugar:</label>
                            </div>
                        </div>
                        <div className='col-12 pb-4'>
                            <button className='btn btn-primary' onClick={handleUpdate}>Actualizar Bodega</button>
                        </div>
                        <div className='h5 text-uppercase pb-2'>Inventario</div>
                        {bodega.InventarioBodega && bodega.InventarioBodega.length > 0 ? (
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
                            </div>
                        ) : (
                            <p>No hay datos de inventario disponibles</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBodega;
