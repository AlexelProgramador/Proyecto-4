import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../Componentes/Modal';
import { TablaAlmacenamiento } from '../../Componentes/TableHomeAlmacenamiento';
import { fetchDatos } from '../../Hooks/useFetchRequest';
import { deleteReq } from '../../Hooks/useDeleteRequest';

export const HomeBodega = () => {
    const [dataBodega, setDataBodega] = useState([]);
    const [cargandoProductos, setCargandoProductos] = useState(true);
    const navigate = useNavigate();
    const tipoAlmacenamiento = "Bodega";
    
    const { setModal } = useModal()

    const fetchData = async () => {
        try {
            const url = '/bodegas';
            const response = await fetchDatos(url);
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
            const url = `/bodega/${id}`;
            await deleteReq(url);
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
            <div className="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Cargando...</span>
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
            fetchData = {fetchData}
            />
            }
        </div>
    );
};

export default HomeBodega;
