import React from 'react';
import DataTable from './DataTable';
import { PDFViewer } from '@react-pdf/renderer';
import ShowSolicitudBotiquin from '../SolicitudBotiquin/ShowSolicitudBotiquin';

export const TableHomeSolicitudBotiquin = ({dataSolicitudBotiquin, setModal, PrimerPdf,handleShow}) => {
  let columns = [];
  let data = [];

  if (dataSolicitudBotiquin.length > 0) {
    columns = [
        { label: 'UUID es de prueba', key: 'uuid' },
        { label: 'Nombre Solicitante', key: 'nombre' },
        { label: 'Origen Retiro', key: 'destino'},
        { label: 'Cantidad Retirada', key: 'cant' },
        { label: 'Acciones', key: 'acciones' }
    ];


    data = dataSolicitudBotiquin.map((item) => ({
        uuid: item._id.substring(0, 6),
        nombre: item.NombreSolicitanteSolicitud,
        destino: item.NombreBotiquin,
        cant: item.InventarioSolicitud.length
        // acciones: (
        //   <div>
        //     <button 
        //       className='btn btn-primary' 
        //       onClick={
        //         () => 
        //           setModal(
        //             <ShowSolicitudBotiquin
        //               setModal={setModal} 
        //               solicitud={item} 
        //               setSolicitud={dataSolicitudBotiquin}
        //               />)}>
        //       <i className="fa-solid fa-eye"></i>
        //     </button>
        //     <button className='btn btn-danger' onClick={() => { 
        //     setModal(
        //       <div style={{width:'900px'}}>
        //         <div className='text-uppercase h6'>Generar documento pdf</div>
        //         <div className='row'>
        //           <div className='col-md-12'>
        //             <PDFViewer width="100%" height="600">
        //               <PrimerPdf item={item}/>
        //             </PDFViewer>
        //             <div className='text-end'>
        //               <button className='btn me-2' onClick={() => {setModal(false)}}>Cancelar</button>
        //             </div>
        //           </div>
        //         </div>
        //       </div>)}}><i className="fa-solid fa-file-pdf"></i></button>
        //   </div>
        // )                
      }
    ));
  }

  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>

  );
};


export default TableHomeSolicitudBotiquin;
