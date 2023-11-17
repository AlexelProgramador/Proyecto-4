// OtraPagina.js
import React from 'react';
import PDFViewer from './PDFViewer'; // Ajusta la ruta según tu estructura de archivos

const OtraPagina = () => {
  const pdfUrl = 'https://example.com/tu-archivo.pdf'; // Reemplaza con la URL de tu PDF

  return (
    <div>
      <h1>Visor de PDF en Otra Página</h1>
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default OtraPagina;