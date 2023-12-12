import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from '../Componentes/Modal';
import TablaUsuariosAcciones from '../Componentes/TableUsuariosAcciones';
import { fetchDatos } from '../Hooks/useFetchRequest';

export const ShowUsuario = () => {
    const [userData, setUserData] = useState({});
    const [cargandoUsuario, setCargandoUsuario] = useState(true);
    const { id } = useParams();
    const url = `http://localhost:8000/api/usuario/${id}/edit`; // Reemplaza con la URL de tu backend

    const { setModal } = useModal()

    useEffect(() => {
        const fetchUsuario= async () => {
            try {
                const url = `/usuario/${id}`;
                const data = await fetchDatos(url);
                setUserData(data.data);
            } catch (error) {
                console.error('Error al obtener la información de la bodega', error);
            } finally{
                setCargandoUsuario(false);
            }
        };

        fetchUsuario();
    }, [url]);

    return (
        <div>
            {cargandoUsuario ? 
            <div class="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            : <TablaUsuariosAcciones userData={userData} setModal={setModal}/>}
        </div>
    );
};

export default ShowUsuario;
