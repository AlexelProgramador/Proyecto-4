import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from '../Componentes/Modal';
import TablaUsuariosAcciones from '../Componentes/TableUsuariosAcciones';
import { fetchDatos } from '../Hooks/useFetchRequest';
import Error from '../Maquetado/Error';

export const ShowUsuario = ({ setModal, user, fetchData }) => {

    const [dataBodega, setDataBodega] = useState([]);
    const [dataBotiquin, setDataBotiquin] = useState([]);
    const response = JSON.parse(localStorage.getItem("response"));
    const isAdmin = response && response.usuario && response.usuario.includes("Administrador");

    // console.log(isAdmin)

    useEffect(() => {
        const fetchDataBodegaBotiquin = async () => {
            try {
                const bodegaResponse = await fetchDatos('/bodegas');
                setDataBodega(bodegaResponse);

                const botiquinResponse = await fetchDatos('/botiquines');
                setDataBotiquin(botiquinResponse);
            } catch (error) {
                console.error('Error al obtener datos', error);
            }
        };

        fetchDataBodegaBotiquin();
    }, []);

    const findEncargado = (almacenamiento, data) => {
        const almacenamientoData = data.find(item => item._id === almacenamiento);
        return almacenamientoData ? almacenamientoData.Nombre : null;
    };

    return (
        <div>
            { isAdmin ? (
            <div style={{maxWidth:'800px'}}>
                <div className='h5 text-uppercase pb-2'>Informacion Usuario</div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='h6'>Nombre</div>
                        <p>{user.nombre + ' ' + user.apellido}</p>
                    </div>
                    <div className='col-sm-6'>
                        <div className='h6'>Nombre de Usuario</div>
                        <p>{user.usuario}</p>
                    </div>
                    <div className='col-sm-6'>
                        <div className='h6'>Rol</div>
                        <p>{user.rol}</p>
                    </div>
                    {user.rol == 'Administrador' ? (
                        null
                    ):(
                        <div className='col-sm-6'>
                            <div className='h6'>Encargado/a de</div>
                            <p>{findEncargado(user.almacenamiento, dataBodega) || findEncargado(user.almacenamiento, dataBotiquin)}</p>
                        </div>
                    )}
                    
                </div>
            </div>
            ) : (<Error/>)}
        </div>
    );
};

export default ShowUsuario;
