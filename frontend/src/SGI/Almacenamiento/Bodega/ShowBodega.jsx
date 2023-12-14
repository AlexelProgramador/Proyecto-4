import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../Componentes/Modal';
import TablaProductosAcciones from '../../Componentes/TableProductosAcciones';
import { fetchDatos } from '../../Hooks/useFetchRequest';

export const ShowBodega = () => {
    const [bodegaData, setBodegaData] = useState({});
    const [cargandoBodega, setCargandoBodega] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const url = `http://localhost:8000/api/bodega/${id}/edit`; // Reemplaza con la URL de tu backend

    const { setModal } = useModal()

    useEffect(() => {
        const fetchBodega = async () => {
            try {
                const url = `/bodega/${id}`;
                const data = await fetchDatos(url);
                setBodegaData(data.data);
            } catch (error) {
                console.error('Error al obtener la información de la bodega', error);
            } finally{
                setCargandoBodega(false);
            }
        };

        fetchBodega();
    }, [url]);

    const handleShowProducto = (id) => {
        navigate(`/show-producto/${id}`); //Ruta para la edición de producto
      };

    return (
        <div>
            {cargandoBodega ? 
            <div className="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            : <TablaProductosAcciones 
                almacenamientoData={bodegaData} 
                setModal={setModal}
                handleShow={handleShowProducto}/>}
        </div>
    );
};

export default ShowBodega;
