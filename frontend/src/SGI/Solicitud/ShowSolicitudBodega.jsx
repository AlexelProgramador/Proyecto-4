import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TerminarSolicitud } from './Componente/TerminarSolicitud';
import { fetchDatos } from '../Hooks/useFetchRequest';
import { putReq } from '../Hooks/usePutRequest';

export const ShowSolicitudBodega = ({ setModal, solicitud, setSolicitud, fetchData }) => {
    // const [solicitud, setSolicitud] = useState({});
    const [cargandoSolicitud, setCargandoSolicitud] = useState(true);
    // const { id } = useParams();
    const navigate = useNavigate();
    //const url = `http://localhost:8000/api/solicitud/${id}/edit`; // Reemplaza con la URL de tu backend

    // const fetchSolicitud = async () => {
    //     try {
    //         // const url = `/solicitud_bodega/${id}`; 
    //         // const data = await fetchDatos(url);
    //         setSolicitud(data);
    //     } catch (error) {
    //         console.error('Error al obtener la información de la solicitud', error);
    //     } finally {
    //         setCargandoSolicitud(false);
    //     }
    // };
    useEffect(() => {
        fetchData();
    }, []);

    const aceptarSoli  = async (id) => {
        const url = `/solicitud_bodega/${solicitud._id}/aceptar`;
        putReq(url, solicitud)
        .then(response => {
            // Manejar la respuesta si es necesario
            console.log(response.data);
            fetchData();
            setModal(false);
            // Redirigir a la página deseada después de agregar una nueva solicitud
            // navigate('/show-solicitud'); // Cambia '/ruta-de-redireccion' con la ruta deseada
        })
        .catch(error => {
            // Manejar el error si ocurre
            console.error('Error al rechazar solicitud: ', error, solicitud);
        });

        fetchData();
            setModal(false);
        // navigate("/show-solicitud");
    };
    const rechazarSoli = (id) => {
        const url = `/solicitud_bodega/${solicitud._id}/rechazar`;
        putReq(url, solicitud)
        .then(response => {
            // Manejar la respuesta si es necesario
            console.log(response.data);
            fetchData();
            setModal(false);
            // Redirigir a la página deseada después de agregar una nueva solicitud
            // navigate('/show-solicitud'); // Cambia '/ruta-de-redireccion' con la ruta deseada
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
            
            <TerminarSolicitud solicitud={solicitud} handleinput = {handleInputChange} aceptar = {aceptarSoli} rechazar = {rechazarSoli} setModal={setModal} />
    
        </div>
    );    
};

export default ShowSolicitudBodega;
