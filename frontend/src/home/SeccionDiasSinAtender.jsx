import React from "react";

const SeccionDiasSinAtender = ({ data, getUnattendedRequests }) => {
  const unattendedRequests = getUnattendedRequests(data);

  return (
    <div className="rightBar">
      {unattendedRequests.map((request, index) => (
        <p key={index}>
          Solicitud {request.nroSolicitud} lleva {request.daysUnattended} días
          sin atender
        </p>
      ))}
    </div>
  );
};

export default SeccionDiasSinAtender;
