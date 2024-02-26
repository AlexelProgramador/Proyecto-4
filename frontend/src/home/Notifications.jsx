import React, { useState, useEffect } from "react";
import SeccionDiasSinAtender from "./SeccionDiasSinAtender";

const getRole = (nroEtapa) => {
  switch (nroEtapa) {
    case "0":
      return "Secretaria";
    case 1:
      return "Encargado de presupuesto";
    case 2:
      return "Encargado de abastecimiento";
    case 3:
      return "Subdirectora";
    case 4:
      return "Encargado de abastecimiento";
    case 5:
      return "Bodeguero";
    case "Dea":
      return "Dea";
    default:
      return "completado";
  }
};
// Define la función getUnattendedRequests
const getUnattendedRequests = (data, userId) => {
  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const userRoles = responseLocalStorage?.usuario || [];
  const userRole = userRoles.length > 0 ? userRoles[0] : null; // Obtener el primer rol del array, o null si no hay roles

  if (!data) {
    return [];
  }

  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 3);
  console.log(userRoles)
  return data
    .filter((request) => 
    (request.nroEtapa !== 'Finalizado') &&
      (
        (request.nroEtapa === 'Rechazado' && 
        request.infoSolicitud.idUsuario === userId) ||
        (request.nroEtapa !== 'Rechazado' &&
          (userRole && (getRole(request.nroEtapa) == userRole || 
          (userRoles[1] && getRole(request.nroEtapa) === userRoles[1]) ))
        )
      ) 
    )
    // .filter((request) => 
    // // Filtrar por rol del usuario
    // (
    //   (userRole && (getRole(request.nroEtapa) == userRole || (userRoles[1] && getRole(request.nroEtapa) === userRoles[1]) ))
    // )
    // )
    .filter((request) => new Date(request.updated_at) < oneDayAgo)
    .map((request) => ({
      nroSolicitud: request.infoSolicitud.nroSolicitud,
      daysUnattended: Math.floor(
        (new Date() - new Date(request.updated_at)) / (1000 * 60 * 60 * 24)
      ),
      nroEtapa: request.nroEtapa // Agrega nroEtapa al objeto request
    }));
    
};

const NotificationSection = ({ toggleTable, showTable, data, userId}) => {
  const [isHoveredNoti, setIsHoveredNoti] = useState(false);
  const [unattendedRequests, setUnattendedRequests] = useState([]); // Estado para almacenar las solicitudes sin atender

  useEffect(() => {
    if (data) {
      const filteredRequests = getUnattendedRequests(data, userId);
      setUnattendedRequests(filteredRequests);
    }
  }, [data, userId]);

  return (
    <div className="notification-container" style={{ position: "relative" }}>
      <div
        style={{
          cursor: "pointer",
          padding: "0px",
          width: "30px",
          height: "30px",
          borderRadius: "16px",
          color: isHoveredNoti ? "gray" : "#1E4162",
          backgroundColor: isHoveredNoti ? "#d4d4d4" : "",
        }}
        onMouseEnter={() => setIsHoveredNoti(true)}
        onMouseLeave={() => setIsHoveredNoti(false)}
        className="d-flex justify-content-center align-items-center "
        onClick={toggleTable}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 448 512"
        >
          <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z" />
        </svg>
        {unattendedRequests.length  > 0 && (
          <span className="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "10px" }}>
            {unattendedRequests.length}
          </span>
        )}
      </div>
      {showTable && (
        <div
          className="notificaciones"
          style={{
            position: "absolute",
            top: "100%",
            right: 20,
            zIndex: 1,
            background: "white",
            border: "0px solid #1E4162",
            boxShadow: "0px 3px 3px 2px rgba(0, 0, 0, 0.20)",
            width: "25vw",
            maxHeight: "25vw",
            padding: "10px",
            borderRadius: "5px",
            color: "rgba(0, 0, 0, 0.87)",
            fontSize: "14px",
            overflowY: "auto",
          }}
        >
          <h6 className="border-bottom pb-2" style={{ color: "rgba(0, 0, 0, 0.87)", fontSize: "14px" }}>
            Solicitudes sin verificar por 3 días
          </h6>
          <SeccionDiasSinAtender unattendedRequests={unattendedRequests} />
        </div>
      )}
    </div>
  );
};

export default NotificationSection;
