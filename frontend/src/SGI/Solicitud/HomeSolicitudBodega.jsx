import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../Componentes/Modal';
import { PrimerPdf } from '../PDFRenderer/PrimerPdf';
import { TableHomeSolicitudBodega } from '../Componentes/TableHomeSolicitudBodega';
import { fetchDatos } from '../Hooks/useFetchRequest';
import Error from '../Maquetado/Error';

export const HomeSolicitudBodega = () => {
  const [dataSolicitudBodega, setDataSolicitudBodega] = useState([]);
  const [cargandoSolicitudBodega, setCargandoSolicitudBodega] = useState(true);
  const response = JSON.parse(localStorage.getItem("response"));
  const navigate = useNavigate();
  const { setModal } = useModal();
  const isBodeguero = response && response.usuario && response.usuario.includes("Bodeguero");
  const isBotiquinero = response && response.usuario && response.usuario.includes("Botiquinero");
  const isAdmin = response && response.usuario && response.usuario.includes("Administrador");

  // console.log(isAdmin)

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
    } finally{
      setCargandoSolicitudBodega(false);
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
      {cargandoSolicitudBodega ? (
        <div className="d-flex justify-content-center" style={{ height: '200px' }}>
          <div className='d-flex align-items-center'>
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      ) : (
        isAdmin || isBodeguero || isBotiquinero ?(
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
            isAdmin={isAdmin}
            />

          </div>
        </div>
        ) :(
          <Error/>
        )
      )}
    </div>
  );
};

export default HomeSolicitudBodega;
