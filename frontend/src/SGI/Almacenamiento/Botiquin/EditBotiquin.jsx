import React, { useState, useEffect } from 'react';
import { showBotiquin, updateBotiquin } from './HandlerBotiquin';
import { useParams, useNavigate } from 'react-router-dom';
import { FormAlmacenamientoUpdate } from '../../Componentes/FormAlmacenamientoUpdate';

export const EditBotiquin = () => {
    const [botiquinData, setBotiquinData] = useState({});
    const [cargandoBotiquin, setCargandoBotiquin] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const url = `http://localhost:8000/api/botiquin/${id}/edit`; // Reemplaza con la URL de tu backend

    useEffect(() => {
        fetchBotiquin();
    }, []);

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

    const handleUpdate = async () => {
        try {
            await updateBotiquin(id, botiquinData);
            navigate('/show-botiquin');
            // Manejar la respuesta si es necesario
        } catch (error) {
            console.error('Error al actualizar la botiquin', error);
            // Manejar el error si es necesario
        }
    };

    return (
        <div>
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
                <FormAlmacenamientoUpdate 
                almacenamientoData={botiquinData} 
                setAlmacenamientoData={setBotiquinData} 
                handleUpdate={handleUpdate}/>
                }
            </div>
        </div>
    );
};

export default EditBotiquin;
