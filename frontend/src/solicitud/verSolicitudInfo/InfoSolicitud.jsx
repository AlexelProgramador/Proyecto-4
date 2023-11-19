import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import axios from 'axios';
import "./Solicitudinfo.css";

const InfoSolicitud = ({ selected = 0, item }) => {
  const [file, setFile] = useState();
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const openPdf = () => {
    let url = 'http://127.0.0.1:8000/api/pdf/' + item.nombrePdf;
    window.open(url, '_blank');
  };
  
  return (
    <>
      <div className="contenido">
      <div className="p-5">
      <h1 className="mb-4">Solicitud Info</h1>
      <h2 className="mb-3">Fecha de la solicitud: <span className="text-primary">{item.solicitudInfo.fecha}</span></h2>
      <h2 className="mb-3">Tipo de solicitud: <span className="text-primary">{item.solicitudInfo.tipoSolicitud}</span></h2>
      <h1 className="mb-4">Usuario info</h1>
      <h2 className="mb-3">Solicitada por: <span className="text-primary">{item.infoUsuario.solicitadoPor}</span></h2>
      <h2 className="mb-3">Anexo: <span className="text-primary">{item.infoUsuario.anexo}</span></h2>
      <h2 className="mb-3">
        Correo Electronico:{" "}
        <span className="text-primary">
          {item.infoUsuario.correo ? item.infoUsuario.correo : "No ingresado"}
        </span>
      </h2>
      <h2>PDF:</h2>
      <button onClick={openPdf} className='btn btn-primary'>Abrir PDF</button>
        {file && (
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
    </div>
      </div>
    </>
  );
};

export default InfoSolicitud;
