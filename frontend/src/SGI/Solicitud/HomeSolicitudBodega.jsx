import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { homeSolicitud } from './HandlerSolicitudBodega';
import { useModal } from '../Componentes/Modal';
import { PrimerPdf } from '../PDFRenderer/PrimerPdf';
import { TableHomeSolicitudBodega } from '../Componentes/TableHomeSolicitudBodega';

export const HomeSolicitudBodega = () => {
  const [dataSolicitudBodega, setDataSolicitudBodega] = useState([]);
  const navigate = useNavigate();
  const { setModal } = useModal()

  const fetchData = async () => {
    try {
      const response = await homeSolicitud();
      setDataSolicitudBodega(response);
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
            <TableHomeSolicitudBodega 
            dataSolicitudBodega={dataSolicitudBodega} 
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

export default HomeSolicitudBodega;
