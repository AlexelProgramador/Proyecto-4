import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBodega, homeBodega } from './HandlerBodega';
import { useModal } from '../../../Components/Modal';
import { TablaInventario } from '../../Componentes/TableHomeAlmacenamiento';

export const HomeBodega = () => {
    const [dataBodega, setDataBodega] = useState([]);
    const navigate = useNavigate();
    const tipoAlmacenamiento = "Bodega";
    
    const { setModal } = useModal()

    const fetchData = async () => {
        try {
            const response = await homeBodega();
            setDataBodega(response);
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
        navigate(`/edit-bodega/${id}`);
    };

    const handleShow = (id) => {
        navigate(`/show-bodega/${id}`);
    };

    return (
        <div>
            <TablaInventario 
            setModal = {setModal} 
            tipoAlmacenamiento = {tipoAlmacenamiento}
            dataInventario = {dataBodega} 
            handleDelete = {handleDelete} 
            handleEdit = {handleEdit}
            handleShow = {handleShow}
            />
        </div>
    );
};

export default HomeBodega;
