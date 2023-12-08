import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDatos } from '../Hooks/useFetchRequest';
import { useModal } from '../Componentes/Modal';
import { PrimerPdf } from '../PDFRenderer/PrimerPdf';
import { TableHomeSolicitudBotiquin } from '../Componentes/TableHomeSolicitudBotiquin';

export const ShowSolicitudBotiquin = () => {
  const [dataSolicitudBotiquin, setDataSolicitudBotiquin] = useState([]);
  const navigate = useNavigate();
  const { setModal } = useModal()

  const fetchData = async (id) => {
    try {
      const url = `/solicitud_bodega/${id}`; 
      const data = await fetchDatos(url);
      setDataSolicitudBotiquin(data);
    } catch (error) {
      console.error('Error al obtener datos', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleShow = (id) => {
    navigate(`/show-solicitud/${id}`);
  };

  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Solicitudes</div>                
          <div className='table-responsive'>
            <TableHomeSolicitudBotiquin
            dataSolicitudBotiquin={dataSolicitudBotiquin} 
            setModal={setModal} 
            PrimerPdf={PrimerPdf}
            handleShow={handleShow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSolicitudBotiquin;