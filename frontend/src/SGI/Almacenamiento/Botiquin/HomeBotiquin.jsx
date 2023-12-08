import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../Components/Modal';
import { TablaAlmacenamiento } from '../../Componentes/TableHomeAlmacenamiento';
import { fetchDatos } from '../../Hooks/useFetchRequest';
import { deleteReq } from '../../Hooks/useDeleteRequest';


export const HomeBotiquin = () => {
    const [dataBotiquin, setDataBotiquin] = useState([]);
    const [cargandoProductos, setCargandoProductos] = useState(true);
    const navigate = useNavigate();
    const { setModal } = useModal()
    const tipoAlmacenamiento = "Botiquín";

    const fetchData = async () => {
        try {
            const url = '/botiquines';
            const response = await fetchDatos(url);
            setDataBotiquin(response);
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
            const url = `/botiquin/${id}`;
            await deleteReq(url);
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
            dataAlmacenamiento = {dataBotiquin} 
            handleDelete = {handleDelete} 
            handleEdit = {handleEdit}
            handleShow = {handleShow}
            />
            }
        </div>
    );
};

export default HomeBotiquin;
