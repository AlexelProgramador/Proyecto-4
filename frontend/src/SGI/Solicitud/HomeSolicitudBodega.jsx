import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../Componentes/Modal';
import { PrimerPdf } from '../PDFRenderer/PrimerPdf';
import { TableHomeSolicitudBodega } from '../Componentes/TableHomeSolicitudBodega';
import { fetchDatos } from '../Hooks/useFetchRequest';

export const HomeSolicitudBodega = () => {
  const [dataSolicitudBodega, setDataSolicitudBodega] = useState([]);
  const response = JSON.parse(localStorage.getItem("response"));
  const navigate = useNavigate();
  const { setModal } = useModal();
  const isBodeguero = response && response.usuario && response.usuario.includes("Bodeguero");
  const isBotiquinero = response && response.usuario && response.usuario.includes("Botiquinero");


  const fetchData = async () => {
    try {
      const idAlm = response.almacenamiento;
      //Mostrar solicitudes según rol
      if (isBodeguero){
        const url = `/solicitudes_bodega/${idAlm}/bodega`;
        const response = await fetchDatos(url);
        setDataSolicitudBodega(response);
      } else if (isBotiquinero){
        const url = `/solicitudes_bodega/${idAlm}/botiquin`;
        const response = await fetchDatos(url);
        setDataSolicitudBodega(response);
      } else{
        const url = '/solicitudes_bodega';
        const response = await fetchDatos(url);
        setDataSolicitudBodega(response);
      }
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
      {dataSolicitudBodega.length === 0 ? (
        <div class="d-flex justify-content-center" style={{ height: '200px' }}>
          <div className='d-flex align-items-center'>
            <div class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      ) : (
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Solicitudes</div>
          <TableHomeSolicitudBodega 
          dataSolicitudBodega={dataSolicitudBodega} 
          setModal={setModal} 
          PrimerPdf={PrimerPdf}
          handleShow={handleShow}
          fetchData={fetchData}
          isBodeguero={isBodeguero}
          isBotiquinero={isBotiquinero}
          />
        </div>
      </div>
      )}
    </div>
  );
};

export default HomeSolicitudBodega;
