import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormAlmacenamientoUpdate } from '../../Componentes/FormAlmacenamientoUpdate';
import { fetchDatos } from '../../Hooks/useFetchRequest';
import { putReq } from '../../Hooks/usePutRequest';

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
            const url = `/botiquin/${id}`;
            const data = await fetchDatos(url);
            setBotiquinData(data.data);
        } catch (error) {
            console.error('Error al obtener la información del botiquin', error);
        } finally{
            setCargandoBotiquin(false);
        }
    };

    const handleUpdate = async () => {
        const url = `/botiquin/${id}`;
        putReq(url,botiquinData)
        .then(data => {
            if (data.status === 200 || data.statusCode === 200) {
                navigate('/show-botiquin');
            }
        })
        .catch(error => {
          // Manejar el error si ocurre
            console.error('Error al actualizar el botiquín: ', error);
        });
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
