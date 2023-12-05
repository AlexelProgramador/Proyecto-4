import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBodega, homeBodega } from './HandlerBodega';
import { useModal } from '../../../Components/Modal';
import { TablaAlmacenamiento } from '../../Componentes/TableHomeAlmacenamiento';

export const HomeBodega = () => {
    const [dataBodega, setDataBodega] = useState([]);
    const [cargandoProductos, setCargandoProductos] = useState(true);
    const navigate = useNavigate();
    const tipoAlmacenamiento = "Bodega";
    
    const { setModal } = useModal()

    const fetchData = async () => {
        try {
            const response = await homeBodega();
            setDataBodega(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        } finally{
            setCargandoProductos(false);
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
            {cargandoProductos ? 
            <div class="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            :
            <TablaAlmacenamiento 
            setModal = {setModal} 
            tipoAlmacenamiento = {tipoAlmacenamiento}
            dataAlmacenamiento = {dataBodega} 
            handleDelete = {handleDelete} 
            handleEdit = {handleEdit}
            handleShow = {handleShow}
            />
            }
        </div>
    );
};

export default HomeBodega;