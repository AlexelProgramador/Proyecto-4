import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBotiquin, homeBotiquin } from './HandlerBotiquin';
import { useModal } from '../../../Components/Modal';
import { TablaInventario } from '../../Componentes/TableHomeAlmacenamiento';


export const HomeBotiquin = () => {
    const [dataBotiquin, setDataBotiquin] = useState([]);
    const navigate = useNavigate();
    const { setModal } = useModal()
    const tipoAlmacenamiento = "Botiquín";

    const fetchData = async () => {
        try {
            const response = await homeBotiquin();
            setDataBotiquin(response);
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
            <TablaInventario 
            setModal = {setModal} 
            tipoAlmacenamiento = {tipoAlmacenamiento}
            dataInventario = {dataBotiquin} 
            handleDelete = {handleDelete} 
            handleEdit = {handleEdit}
            handleShow = {handleShow}
            />
        </div>
    );
};

export default HomeBotiquin;
