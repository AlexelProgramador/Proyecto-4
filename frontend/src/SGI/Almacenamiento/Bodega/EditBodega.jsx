import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FormAlmacenamientoUpdate } from '../../Componentes/FormAlmacenamientoUpdate';
import { fetchDatos } from '../../Hooks/useFetchRequest';
import { putReq } from '../../Hooks/usePutRequest';
import Error from '../../Maquetado/Error';

export const EditBodega = () => {
    const [bodegaData, setBodegaData] = useState({});
    const [cargandoBodega, setCargandoBodega] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const response = JSON.parse(localStorage.getItem("response"));
    const isAdmin = response && response.usuario && response.usuario.includes("Administrador");

    useEffect(() => {
        fetchBodega();
    }, [cargandoBodega]);

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
    

    const handleUpdate = async () => {
        const url = `/bodega/${id}`;
        putReq(url,bodegaData)
        .then(data => {
            if (data.status === 200 || data.statusCode === 200) {
                navigate('/show-bodega');
            }
        })
        .catch(error => {
          // Manejar el error si ocurre
            console.error('Error al actualizar la bodega: ', error);
        });
    };
    return (
        <div>
            {cargandoBodega ? (
            <div className="d-flex justify-content-center" style={{height:'200px'}}>
                <div className='d-flex align-items-center'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
            )
            : (
                isAdmin ? (
             
            <FormAlmacenamientoUpdate 
            almacenamientoData={bodegaData} 
            setAlmacenamientoData={setBodegaData} 
            handleUpdate={handleUpdate}/>
            ) : (
                <Error/>
            )
            )}
        </div>
    );
};

export default EditBodega;
