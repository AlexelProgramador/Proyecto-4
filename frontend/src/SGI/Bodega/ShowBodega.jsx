import React, { useState, useEffect } from 'react';
import { showBodega } from './HandlerBodega';
import { useParams } from 'react-router-dom';
import { useModal } from '../../Components/Modal';

export const ShowBodega = () => {
    const [bodega, setBodega] = useState({});
    const { id } = useParams();
    const url = `http://localhost:8000/api/bodega/${id}/edit`; // Reemplaza con la URL de tu backend

    const { setModal } = useModal()

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

    return (
        <div>
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='h5 text-uppercase pb-2'>Inventario Bodega</div>
                    {bodega.InventarioBodega && bodega.InventarioBodega.length > 0 ? (
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Nombre Producto</th>
                                    <th>Cantidad Inventario</th>
                                    <th>Acciones</th>
                                    {/* Encabezados */}
                                </tr>
                            </thead>
                            <tbody>
                                {bodega.InventarioBodega.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.NombreProducto}</td>
                                        <td>{item.CantidadAsignadaProducto}</td>
                                        <td> 
                                            <div className='btn-group btn-group-sm'>
                                                <button className='btn btn-primary'><i class="fa-solid fa-eye"></i></button>
                                                <button className='btn btn-warning'><i class="fa-solid fa-pen"></i></button>
                                                <button className='btn btn-danger' onClick={() => { 
                                                    setModal(
                                                        <div className=''>
                                                            <div className='text-uppercase h6'>Confirmar</div>
                                                            <div className='text-center pt-3'>¿Está seguro que desea eliminar este registro?</div>
                                                            <p className='fw-semibold'>{item.NombreBodega}</p>
                                                            <div className='text-end'>
                                                            <button className='btn me-2'  onClick={() => {setModal(false)}}>Cancelar</button>
                                                            <button className='btn btn-danger' >Eliminar</button>
                                                            </div>
                                                        </div>)}}><i class="fa-solid fa-trash-can"></i></button>
                                            </div>
                                        </td>
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

export default ShowBodega;
