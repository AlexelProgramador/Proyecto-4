import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../Componentes/Modal';
import { TableHomeUsuario } from '../Componentes/TableHomeUsuario';
import { fetchDatos } from '../Hooks/useFetchRequest';
import { deleteReq } from '../Hooks/useDeleteRequest';

export const HomeUsuario = () => {
    const [userData, setUserData] = useState([]);
    const [cargandoUsuarios, setCargandoUsuarios] = useState(true);
    const navigate = useNavigate();
    
    const { setModal } = useModal()

    const fetchData = async () => {
        try {
            const url = '/usuarios';
            const response = await fetchDatos(url);
            setUserData(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        } finally{
            setCargandoUsuarios(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const url = `/usuario/${id}`;
            await deleteReq(url);
            fetchData();
            setModal(false);
        } catch (error) {
            console.error('Error al eliminar el elemento', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-usuario/${id}`);
    };

    const handleShow = (id) => {
        navigate(`/show-usuario/${id}`);
    };

    return (
        <div>
            {cargandoUsuarios ? 
            <div class="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            :
            <TableHomeUsuario
            setModal = {setModal} 
            userData = {userData} 
            handleDelete = {handleDelete} 
            handleEdit = {handleEdit}
            handleShow = {handleShow}
            fetchData = {fetchData}
            />
            }
        </div>
    );
};

export default HomeUsuario;
