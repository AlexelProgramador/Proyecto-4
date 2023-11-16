import React from "react";
import "./Solicitudinfo.css";
const InfoSolicitud = ({ selected = 0, item }) => {
  return (
    <>
      <div className="contenido">
        <h1>Solicitud Info</h1>
        <h2>Fecha de la solicitud: {item.solicitudInfo.fecha}</h2>
        <h2>Tipo de solicitud: {item.solicitudInfo.tipoSolicitud}</h2>
        <h1>Usuario info</h1>
        <h2>Solicitada por: {item.infoUsuario.solicitadoPor}</h2>
        <h2>Anexo: {item.infoUsuario.anexo}</h2>
        <h2>
          Correo Electronico:{" "}
          {item.infoUsuario.correo ? item.infoUsuario.correo : "No ingresado"}
        </h2>
      </div>
    </>
  );
};

export default InfoSolicitud;
