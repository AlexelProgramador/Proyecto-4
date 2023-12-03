import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';

export const TableHomeSolicitudBodega = ({dataSolicitudBodega, setModal, PrimerPdf,handleShow}) => {

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>UUID es de prueba</th>
            <th>Nombre Solicitante</th>
            <th>Destino Solicitud</th>
            <th>Cantidad a Pedir</th>
            <th>Estado Solicitud</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {dataSolicitudBodega.map((item) => (
            <tr key={item.id}>
              <td>{item._id}</td>
              <td>{item.NombreSolicitanteSolicitud}</td>
              <td>{item.NombreBotiquin}</td>
              <td>{item.InventarioSolicitud.length}</td>
              <td>{item.EstadoSolicitud}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleShow(item._id)}><i class="fa-solid fa-eye"></i></button>
                <button className='btn btn-danger' onClick={() => { 
                setModal(
                  <div className=''>
                    <div className='text-uppercase h6'>Generar documento pdf</div>
                    <div className='text-center pt-3'></div>
                    <PDFViewer width="1000" height="600">
                      <PrimerPdf item={item}/>
                    </PDFViewer>
                    <div className='text-end'>
                      <button className='btn me-2' onClick={() => {setModal(false)}}>Cancelar</button>
                    </div>
                  </div>)}}><i class="fa-solid fa-file-pdf"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default TableHomeSolicitudBodega;
