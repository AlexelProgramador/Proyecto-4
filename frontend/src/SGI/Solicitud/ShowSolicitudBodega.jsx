import React, { useState, useEffect } from 'react';
import { rechazarSolicitud, showSolicitud, aceptarSolicitud } from './HandlerSolicitudBodega';
import { useParams, useNavigate } from 'react-router-dom';
import { TerminarSolicitud } from './Componente/TerminarSolicitud';

export const ShowSolicitudBodega = () => {
    const [solicitud, setSolicitud] = useState({});
    const [cargandoSolicitud, setCargandoSolicitud] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    //const url = `http://localhost:8000/api/solicitud/${id}/edit`; // Reemplaza con la URL de tu backend

    const fetchSolicitud = async () => {
        try {
            const data = await showSolicitud(id);
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
        aceptarSolicitud(id, solicitud)
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
        rechazarSolicitud(id, solicitud)
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
    console.log(solicitud);
    return (
        <div>
            { cargandoSolicitud ? <p>CArgando Datos</p> : <TerminarSolicitud solicitud={solicitud} handleinput = {handleInputChange} aceptar = {aceptarSoli} rechazar = {rechazarSoli} />}
    
        </div>
    );    
};

export default ShowSolicitudBodega;
