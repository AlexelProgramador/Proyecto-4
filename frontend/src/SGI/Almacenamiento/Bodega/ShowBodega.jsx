import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useModal } from '../../Componentes/Modal';
import TablaProductosAcciones from '../../Componentes/TableProductosAcciones';
import { fetchDatos } from '../../Hooks/useFetchRequest';
import { deleteReq } from '../../Hooks/useDeleteRequest';
import Error from '../../Maquetado/Error';

export const ShowBodega = () => {
    const [bodegaData, setBodegaData] = useState({});
    const [cargandoBodega, setCargandoBodega] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const response = JSON.parse(localStorage.getItem("response"));
    const isAdmin = response && response.usuario && response.usuario.includes("Administrador");
    const isBodeguero = response && response.usuario && response.usuario.includes("Bodeguero");

    const { setModal } = useModal();

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

    useEffect(() => {
        fetchBodega();
    }, []);

    const handleShowProducto = (id) => {
        navigate(`/show-producto/${id}`); //Ruta para la edición de producto
    };

    const handleEdit = (id) => {
        navigate(`/edit-producto/${id}`); //Ruta para la edición de producto
    };

    const handleDelete = async (idProd) => {
        try {
          const url = `/bodega/${id}/borrar/${idProd}`;
          await fetchDatos(url);
          fetchBodega();
          setModal(false);
        } catch (error) {
          console.error('Error al eliminar el elemento', error);
        }
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
            : ( isAdmin || isBodeguero ?(<TablaProductosAcciones 
                almacenamientoData={bodegaData} 
                setModal={setModal}
                handleShow={handleShowProducto}
                handleEdit={handleEdit}
                handleDelete={handleDelete}/>
            ) : (
                <Error/>
            )
            )}
        </div>
    );
};

export default ShowBodega;
