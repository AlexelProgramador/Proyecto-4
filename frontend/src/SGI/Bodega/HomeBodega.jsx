import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBodega, homeBodega } from './HandlerBodega';
import { useModal } from '../../Components/Modal';

export const HomeBodega = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    
    const { setModal } = useModal()

    const fetchData = async () => {
        try {
            const response = await homeBodega();
            setData(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBodega(id);
            fetchData();
            setModal(false);
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-bodega/${id}`); // Cambia '/edit-bodega' con la ruta de edición deseada
    };

    const handleShow = (id) => {
        navigate(`/show-bodega/${id}`);
    };

    return (
        <div>
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between pb-2'>
                        <div className='h5 text-uppercase'>Bodegas</div>
                        <div className=''><button className='btn btn-success' onClick={() => { 
                            setModal(
                                <div className="flex flex-col justify-center items-center w-[350px] h-[350px] border-amber-400 border-4 rounded-md">
                                
                                </div>)}}>Crear <i class="fa-solid fa-plus"></i></button>
                            </div>
                    </div>
                    <div className='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>UUID es de prueba</th>
                                <th>Nombre Bodega</th>
                                <th>Lugar Bodega</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item._id}</td>
                                    <td>{item.NombreBodega}</td>
                                    <td>{item.LugarBodega}</td>
                                    <td>
                                        <div className='btn-group btn-group-sm'>
                                            <button className='btn btn-primary' onClick={() => handleShow(item._id)}><i class="fa-solid fa-eye"></i></button>
                                            <button className='btn btn-warning' onClick={() => handleEdit(item._id)}><i class="fa-solid fa-pen"></i></button>
                                            <button className='btn btn-danger' onClick={() => { 
                                                setModal(
                                                    <div className=''>
                                                        <div className='text-uppercase h6'>Confirmar</div>
                                                        <div className='text-center pt-3'>¿Está seguro que desea eliminar este registro?</div>
                                                        <p className='fw-semibold'>{item.NombreBodega}</p>
                                                        <div className='text-end'>
                                                        <button className='btn me-2' onClick={() => {setModal(false)}}>Cancelar</button>
                                                        <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Eliminar</button>
                                                        </div>
                                                    </div>)}}><i class="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBodega;
