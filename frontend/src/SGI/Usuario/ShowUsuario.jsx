import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from '../Componentes/Modal';
import TablaUsuariosAcciones from '../Componentes/TableUsuariosAcciones';
import { fetchDatos } from '../Hooks/useFetchRequest';

export const ShowUsuario = ({ setModal, user, fetchData }) => {
    // const [userData, setUserData] = useState({});
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const { id } = useParams();
    const url = `http://localhost:8000/api/usuario/${id}/edit`; // Reemplaza con la URL de tu backend

    // const { setModal } = useModal()

    // console.log(user.nombre)

    // useEffect(() => {
    //     const fetchUsuario= async () => {
    //         try {
    //             const url = `/usuario/${id}`;
    //             const data = await fetchDatos(url);
    //             setUser(data.data);
    //         } catch (error) {
    //             console.error('Error al obtener la información de la bodega', error);
    //         } finally{
    //             setCargandoUsuario(false);
    //         }
    //     };

    //     fetchUsuario();
    // }, [url]);

    const [dataBodega, setDataBodega] = useState([]);
    const [dataBotiquin, setDataBotiquin] = useState([]);

    const fetchDataBodega = async () => {
        try {
            const url ='/bodegas';
            const response = await fetchDatos(url);
            setDataBodega(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };

    const fetchDataBotiquin = async () => {
        try {
            const url ='/botiquines';
            const response = await fetchDatos(url);
            setDataBotiquin(response);
        } catch (error) {
            console.error('Error al obtener datos', error);
        }
    };


    useEffect(() => {
        fetchDataBodega();
        fetchDataBotiquin();
    }, []);

    // const botiquin = dataBotiquin.find(botiquin => botiquin._id === user.almacenamiento);
    // const bodega = dataBodega.find(bodega => bodega._id === user.almacenamiento);

    console.log(dataBodega)

    return (
        <div>
            {/* {cargandoUsuario ? 
            <div className="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div> */}
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
                    {dataBodega.map(bodega => (
                        user.almacenamiento === bodega._id ? (
                            <div className='col-sm-6'>
                                <div className='h6'>Encargado/a de</div>
                                <p>{bodega.Nombre}</p>
                            </div>
                        ): null 
                    ))}
                    {dataBotiquin.map(botiquin => (
                        user.almacenamiento === botiquin._id ? (
                            <div className='col-sm-6'>
                                <div className='h6'>Encargado/a de</div>
                                <p>{botiquin.Nombre}</p>
                            </div>
                        ): null 
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowUsuario;
