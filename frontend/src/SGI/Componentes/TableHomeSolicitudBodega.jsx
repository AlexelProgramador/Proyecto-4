import React from 'react';
import DataTable from './DataTable';
import { PDFViewer } from '@react-pdf/renderer';

export const TableHomeSolicitudBodega = ({dataSolicitudBodega, setModal, PrimerPdf,handleShow}) => {
  let columns = [];
  let data = [];

  if (dataSolicitudBodega.length > 0) {
    columns = [
        { label: 'UUID es de prueba', key: 'uuid' },
        { label: 'Nombre Solicitante', key: 'nombre' },
        { label: 'Destino Solicitud', key: 'destino'},
        { label: 'Cantidad a Pedir', key: 'cant' },
        { label: 'Estado Solicitud', key: 'est' },
        { label: 'Acciones', key: 'acciones' }
    ];
    
    function getClassByEstado(estado) {
      switch (estado) {
        case 'Aceptado':
          return 'bg-success';
        case 'Pendiente':
          return 'bg-warning';
        case 'Rechazado':
          return 'bg-danger';
        default:
          return 'bg-secondary';
      }
    }

    data = dataSolicitudBodega.map((item) => ({
        uuid: item._id,
        nombre: item.NombreSolicitanteSolicitud,
        destino: item.NombreBotiquin,
        cant: item.InventarioSolicitud.length,
        est: <span className={`badge rounded-pill text-${getClassByEstado(item.EstadoSolicitud)}`}>{item.EstadoSolicitud}</span>,
        acciones: (
          <div>
            <button className='btn btn-primary' onClick={() => handleShow(item._id)}><i class="fa-solid fa-eye"></i></button>
            <button className='btn btn-danger' onClick={() => { 
            setModal(
              <div style={{width:'900px'}}>
                <div className='text-uppercase h6'>Generar documento pdf</div>
                <div className='row'>
                  <div className='col-md-12'>
                    <PDFViewer width="100%" height="600">
                      <PrimerPdf item={item}/>
                    </PDFViewer>
                    <div className='text-end'>
                      <button className='btn me-2' onClick={() => {setModal(false)}}>Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>)}}><i class="fa-solid fa-file-pdf"></i></button>
          </div>
        )                
      }
    ));
  }

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>

  );
};

export default TableHomeSolicitudBodega;
