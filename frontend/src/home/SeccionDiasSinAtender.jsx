import React from "react";

// Define la función getUnattendedRequests
const getUnattendedRequests = (data) => {
  if (!data) {
    return [];
  }

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 3);
  return data
    .filter((request) => new Date(request.updated_at) < oneDayAgo)
    .map((request) => ({
      nroSolicitud: request.solicitudInfo.nroSolicitud,
      daysUnattended: Math.floor(
        (new Date() - new Date(request.updated_at)) / (1000 * 60 * 60 * 24)
      ),
    }));
};

const SeccionDiasSinAtender = ({ data }) => {
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
