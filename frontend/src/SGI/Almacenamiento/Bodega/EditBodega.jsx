import React, { useState, useEffect } from 'react';
import { showBodega, updateBodega } from './HandlerBodega';
import { useParams, useNavigate } from 'react-router-dom';
import { FormAlmacenamientoUpdate } from '../../Componentes/FormAlmacenamientoUpdate';

export const EditBodega = () => {
    const [bodegaData, setBodegaData] = useState({});
    const [cargandoBodega, setCargandoBodega] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const url = `http://localhost:8000/api/bodega/${id}/edit`; // Reemplaza con la URL de tu backend

    useEffect(() => {
        fetchBodega();
    }, [url]);

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

    const handleUpdate = async () => {
        updateBodega(id,bodegaData)
        .then(response => {
            console.log("llego aquí");
            navigate('/show-bodega'); // Cambia '/ruta-de-redireccion' con la ruta deseada
        })
        .catch(error => {
          // Manejar el error si ocurre
          console.error('Error al actualizar la bodega: ', error);
        });
    };
    return (
        <div>
            {cargandoBodega ? <p>Cargando Datos...</p> : 
            <FormAlmacenamientoUpdate 
            almacenamientoData={bodegaData} 
            setAlmacenamientoData={setBodegaData} 
            handleUpdate={handleUpdate}/>
            }
        </div>
    );
};

export default EditBodega;
