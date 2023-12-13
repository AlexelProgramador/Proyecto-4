import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../Components/Modal';
import { PrimerPdf } from '../PDFRenderer/PrimerPdf';
import { TableHomeSolicitudBotiquin } from '../Componentes/TableHomeSolicitudBotiquin';
import { fetchDatos } from '../Hooks/useFetchRequest';

export const HomeSolicitudBotiquin = () => {
  const [dataSolicitudBotiquin, setDataSolicitudBotiquin] = useState([]);
  const navigate = useNavigate();
  const { setModal } = useModal()

  const fetchData = async () => {
    try {
      const url = '/solicitudes_botiquin';
      const response = await fetchDatos(url);
      setDataSolicitudBotiquin(response);
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

export default HomeSolicitudBotiquin;