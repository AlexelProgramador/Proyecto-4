import React from "react";

const SeccionDiasSinAtender = ({ unattendedRequests }) => {
  // const unattendedRequests = getUnattendedRequests(data);
  console.log(unattendedRequests);

  return (
    <div className="rightBar">
      {unattendedRequests.map((request, index) => (
        <p key={index}>
          {request.nroEtapa === 'Rechazado' ? 'Tu' : 'La'} solicitud {request.nroSolicitud} {request.nroEtapa === 'Rechazado' ? 'rechazada' : ''} lleva {request.daysUnattended} días
          sin atender
        </p>
      ))}
    </div>
  );
};

export default SeccionDiasSinAtender;
