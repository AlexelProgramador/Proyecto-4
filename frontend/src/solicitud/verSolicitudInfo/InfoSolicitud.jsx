import React from "react";
import "./Solicitudinfo.css";
const InfoSolicitud = ({ selected = 0, item }) => {
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
    </div>
      </div>
    </>
  );
};

export default InfoSolicitud;
