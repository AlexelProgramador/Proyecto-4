import React, { useState, useEffect } from 'react';
import { showBotiquin } from './HandlerBotiquin';
import { useParams } from 'react-router-dom';
import { useModal } from '../../../Components/Modal';
import TablaProductosAcciones from '../../Componentes/TableProductosAcciones';

export const ShowBotiquin = () => {
    const [botiquinData, setBotiquinData] = useState({});
    const [cargandoBotiquin, setCargandoBotiquin] = useState(true);
    const { id } = useParams();
    const url = `http://localhost:8000/api/botiquin/${id}`; // Reemplaza con la URL de tu backend
    const { setModal } = useModal()

    useEffect(() => {
        const fetchBotiquin = async () => {
            try {
                const data = await showBotiquin(id);
                setBotiquinData(data);
            } catch (error) {
                console.error('Error al obtener la información de la botiquin', error);
            } finally{
                setCargandoBotiquin(false);
            }
        };

        fetchBotiquin();
    }, [url]);

    return (
        <div>
            {cargandoBotiquin ? <p>Cargando Datos...</p> : 
                <TablaProductosAcciones 
                almacenamientoData={botiquinData} 
                setModal={setModal}
                />
            }
        </div>        
    );
};

export default ShowBotiquin;
