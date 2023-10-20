import React from 'react';
import { Link } from 'react-router-dom';

export const SolicitudEtapa2 = ({ solicitudData }) => {



  return (
    <div>
      <h2>Detalles de la Solicitud</h2>
      <div>
        <strong>Solicitado Por:</strong> {solicitudData.solicitadoPor}
      </div>
      <div>
        <strong>Fecha:</strong> {solicitudData.fecha}
      </div>
      <div>
        <strong>Anexo:</strong> {solicitudData.anexo}
      </div>
      <div>
        <strong>Correo Electrónico:</strong> {solicitudData.correoElectronico}
      </div>
      <div>
        <strong>Objeto de Compra:</strong> {solicitudData.objetoCompra}
      </div>
      <div>
        <strong>Cantidad:</strong> {solicitudData.cantidad}
      </div>
      <div>
        <strong>Tipo de Empaque:</strong> {solicitudData.tipoEmpaque}
      </div>
      <div>
        <strong>Argumento y Motivos de la Compra:</strong> {solicitudData.motivosCompra}
      </div>
      <div>
        <strong>Fuente de Financiamiento:</strong> {solicitudData.fuenteFinanciamiento}
      </div>
      <div>
        <strong>Monto Estimado de la Compra:</strong> {solicitudData.montoEstimado}
      </div>
      <div>
        <label>Ingresar Código Costo:</label>
        <input type="text" />
      </div>
      <div>
        {/* ... otros elementos ... */}
        <Link to="/solicitud-etapa3" >Crear Nueva Solicitud</Link>
        </div>
    </div>
  );
};