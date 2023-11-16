import React from "react";
import "./Solicitudinfo.css";
const InfoSolicitud = ({ selected, item = 0 }) => {
  return (
    <>
      <div className="contenido">
        <h1>Solicitud Info</h1>
        <h2>{item.solicitudInfo.nroSolicitud}</h2>
        <h2>{item.solicitudInfo.fecha}</h2>
        <h2>{item.solicitudInfo.tipoSolicitud}</h2>
        <h1>Usuario info</h1>
        <h2>{item.infoUsuario.solicitadoPor}</h2>
        <h2>{item.infoUsuario.anexo}</h2>
        <h2>{item.infoUsuario.correo}</h2>
      </div>
    </>
  );
};

export default InfoSolicitud;
