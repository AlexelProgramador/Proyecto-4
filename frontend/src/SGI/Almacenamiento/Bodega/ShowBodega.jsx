import React, { useState, useEffect } from 'react';
import { showBodega } from './HandlerBodega';
import { useParams } from 'react-router-dom';
import { useModal } from '../../Componentes/Modal';
import TablaProductosAcciones from '../../Componentes/TableProductosAcciones';

export const ShowBodega = () => {
    const [bodegaData, setBodegaData] = useState({});
    const [cargandoBodega, setCargandoBodega] = useState(true);
    const { id } = useParams();
    const url = `http://localhost:8000/api/bodega/${id}/edit`; // Reemplaza con la URL de tu backend

    const { setModal } = useModal()

    useEffect(() => {
        const fetchBodega = async () => {
            try {
                const data = await showBodega(id);
                setBodegaData(data);
            } catch (error) {
                console.error('Error al obtener la información de la bodega', error);
            } finally{
                setCargandoBodega(false);
            }
        };

        fetchBodega();
    }, [url]);

    return (
        <div>
            {cargandoBodega ? 
            <div class="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            : <TablaProductosAcciones almacenamientoData={bodegaData} setModal={setModal}/>}
        </div>
    );
};

export default ShowBodega;
