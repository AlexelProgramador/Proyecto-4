import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from '../../../Components/Modal';
import TablaProductosAcciones from '../../Componentes/TableProductosAcciones';
import { fetchDatos } from '../../Hooks/useFetchRequest';

export const ShowBotiquin = () => {
    const [botiquinData, setBotiquinData] = useState({});
    const [cargandoBotiquin, setCargandoBotiquin] = useState(true);
    const { id } = useParams();
    const { setModal } = useModal()

    useEffect(() => {
        const fetchBotiquin = async () => {
            try {
                const url = `/botiquin/${id}`;
                const data = await fetchDatos(url);
                setBotiquinData(data.data);
            } catch (error) {
                console.error('Error al obtener la información de la botiquin', error);
            } finally{
                setCargandoBotiquin(false);
            }
        };

        fetchBotiquin();
    }, [cargandoBotiquin]);

    return (
        <div>
            {cargandoBotiquin ? 
            <div class="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            : 
                <TablaProductosAcciones 
                almacenamientoData={botiquinData} 
                setModal={setModal}
                />
            }
        </div>        
    );
};

export default ShowBotiquin;
