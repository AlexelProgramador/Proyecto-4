import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBotiquin, homeBotiquin } from './HandlerBotiquin';
import { useModal } from '../../Components/Modal';

export const HomeBotiquin = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const { setModal } = useModal()

    const fetchData = async () => {
        try {
            const response = await homeBotiquin();
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
            await deleteBotiquin(id);
            fetchData();
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-botiquin/${id}`); // Cambia '/edit-botiquin' con la ruta de edición deseada
    };

    const handleShow = (id) => {
        navigate(`/show-botiquin/${id}`);
    };

    return (
        <div>
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between pb-2'>
                        <div className='h5 text-uppercase'>Botiquines</div>
                        <div className=''><button  className='btn btn-success'>Crear <i class="fa-solid fa-plus"></i></button></div>
                    </div>
                    <div className='table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>UUID es de prueba</th>
                                <th>Nombre Botiquin</th>
                                <th>Lugar Botiquin</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item._id}</td>
                                    <td>{item.NombreBotiquin}</td>
                                    <td>{item.LugarBotiquin}</td>
                                    <td>
                                        <div className='btn-group btn-group-sm'>
                                            <button className='btn btn-primary' onClick={() => handleShow(item._id)}><i class="fa-solid fa-eye"></i></button>
                                            <button className='btn btn-warning' onClick={() => handleEdit(item._id)}><i class="fa-solid fa-pen"></i></button>
                                            <button className='btn btn-danger' onClick={() => { 
                                                setModal(
                                                    <div className=''>
                                                        <div className='text-uppercase h6'>Confirmar</div>
                                                        <div className='text-center pt-3'>¿Está seguro que desea eliminar este registro?</div>
                                                        <p className='fw-semibold'>{item.NombreBotiquin}</p>
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

export default HomeBotiquin;
