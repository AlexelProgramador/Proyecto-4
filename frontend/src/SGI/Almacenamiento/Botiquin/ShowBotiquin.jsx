import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../Componentes/Modal';
import TablaProductosAcciones from '../../Componentes/TableProductosAcciones';
import { fetchDatos } from '../../Hooks/useFetchRequest';

export const ShowBotiquin = () => {
    const [botiquinData, setBotiquinData] = useState({});
    const [cargandoBotiquin, setCargandoBotiquin] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
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

    const handleShowProducto = (id) => {
        navigate(`/show-producto/${id}`); //Ruta para la edición de producto
      };

    return (
        <div>
            {cargandoBotiquin ? 
            <div className="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            : 
                <TablaProductosAcciones 
                almacenamientoData={botiquinData} 
                setModal={setModal}
                handleShow={handleShowProducto}
                />
            }
        </div>        
    );
};

export default ShowBotiquin;
