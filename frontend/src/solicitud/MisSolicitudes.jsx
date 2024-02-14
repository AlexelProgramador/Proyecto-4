import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";
import { CheckCircleFill } from "react-bootstrap-icons";
import Pagination from "../Components/Pagination"
import React, { useState } from "react";
import Cookies from "js-cookie";
function getRole(nroEtapa) {
  switch (nroEtapa) {
    case "0":
      return "Secretaria";
    case 1:
      return "Encargado de presupuesto";
    case 2:
      return "Encargado de abastecimiento";
    case 3:
      return "Bodeguero";
    case "Dea":
      return "Dea";
    default:
      return null;
  }
}
const MisSolicitudes = () => {
  const { data, loading, error } = useFetch("etapas");
  const { showAlert, setShowAlert } = useContext(AlertContext);
  const [currentPage, setCurrentPage] = useState(1);
  const response = JSON.parse(localStorage.getItem("response"));
  const ITEMS_PER_PAGE = 10;
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const navigate = useNavigate();

  const userRequests = data ? data.filter(item => item.infoSolicitud.idUsuario === response.usuarioId) : [];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = userRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-75 h-40 mx-auto">
      <div className="card shadow-card rounded-3 border border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between pb-0">
            <div className="h5 text-uppercase">Mis solicitudes</div>
          </div>
          {loading ? (
            <div className="d-flex justify-content-center  m-5">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <div className="table-responsive mx-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">N° Solicitud</th>
                    <th scope="col">Etapa</th>
                    <th scope="col">Solicitado por</th>
                    <th scope="col"></th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedItems.map((item) => {
                    if (item.infoSolicitud.idUsuario === response.usuarioId) {
                      return (
                        <tr key={item._id}>
                          <td>{item.infoSolicitud.nroSolicitud}</td>
                          <td>{item.nroEtapa}</td>
                          <td>{item.infoUsuario?.solicitadoPor}</td>
                          <td>{item.etapa}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              {item.nroEtapa !== "Finalizado" &&
                                response.usuario.some(
                                  (role) =>
                                    role === "Administrador" ||
                                    role === getRole(item.nroEtapa)
                                ) && (
                                  <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                      navigate(
                                        item.nroEtapa === '0'
                                          ? "/solicitudChequeo"
                                          : `/etapa${item.nroEtapa}`,
                                        {
                                          state: { item },
                                        }
                                      )
                                    }
                                  >
                                    Ver Etapa
                                  </button>
                                )}
                              <button
                                className="btn btn-warning"
                                onClick={() =>
                                  navigate(`/verSolicitud`, {
                                    state: { item },
                                  })
                                }
                              >
                                Ver Solicitud
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })}
                  {Array(10 - selectedItems.length)
                    .fill()
                    .map((_, index) => (
                      <tr key={`empty-${index}`}>
                        <td colSpan="5">&nbsp;</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(selectedItems.length / ITEMS_PER_PAGE)}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {showAlert && (
        <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
        >
          <CheckCircleFill
            className="bi flex-shrink-0 me-2"
            aria-label="Success:"
          />
          <div>Solicitud creada correctamente!</div>
        </div>
      )}
    </div>
  );
};
export default MisSolicitudes;
