import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TerminarSolicitud } from './Componente/TerminarSolicitud';
import { fetchDatos } from '../Hooks/useFetchRequest';
import { putReq } from '../Hooks/usePutRequest';

export const ShowSolicitudBodega = () => {
    const [solicitud, setSolicitud] = useState({});
    const [cargandoSolicitud, setCargandoSolicitud] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    //const url = `http://localhost:8000/api/solicitud/${id}/edit`; // Reemplaza con la URL de tu backend

    const fetchSolicitud = async () => {
        try {
            const url = `/solicitud_bodega/${id}`; 
            const data = await fetchDatos(url);
            setSolicitud(data);
        } catch (error) {
            console.error('Error al obtener la información de la solicitud', error);
        } finally {
            setCargandoSolicitud(false);
        }
    };
    useEffect(() => {
        fetchSolicitud();
    }, []);

    const aceptarSoli  = async (id) => {
        const url = `/solicitud_bodega/${id}/aceptar`;
        putReq(url, solicitud)
        .then(response => {
            // Manejar la respuesta si es necesario
            console.log(response.data);
            // Redirigir a la página deseada después de agregar una nueva solicitud
            navigate('/show-solicitud'); // Cambia '/ruta-de-redireccion' con la ruta deseada
        })
        .catch(error => {
            // Manejar el error si ocurre
            console.error('Error al rechazar solicitud: ', error, solicitud);
        });

        navigate("/show-solicitud");
    };
    const rechazarSoli = (id) => {
        const url = `/solicitud_bodega/${id}/rechazar`;
        putReq(url, solicitud)
        .then(response => {
            // Manejar la respuesta si es necesario
            console.log(response.data);
            // Redirigir a la página deseada después de agregar una nueva solicitud
            navigate('/show-solicitud'); // Cambia '/ruta-de-redireccion' con la ruta deseada
        })
        .catch(error => {
            // Manejar el error si ocurre
            console.error('Error al rechazar solicitud: ', error, solicitud);
        });
        navigate("/show-solicitud");
    };

    const handleInputChange = (e) => {
        setSolicitud({
            ...solicitud,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            { cargandoSolicitud ? 
            <div class="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            : <TerminarSolicitud solicitud={solicitud} handleinput = {handleInputChange} aceptar = {aceptarSoli} rechazar = {rechazarSoli} />}
    
        </div>
    );    
};

export default ShowSolicitudBodega;
