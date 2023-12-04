import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";
import { CheckCircleFill } from "react-bootstrap-icons";
import React, { useState } from "react";
import Cookies from "js-cookie";
import useDeleteRequest from "../Hooks/useDeleteRequest";

function getRole(nroEtapa) {
  switch (nroEtapa) {
    case 0:
      return "Secretaria";
    case 1:
      return "Encargado de presupuesto";
    case 2:
      return "Directo";
    case 3:
      return "Encargado de abastecimiento";
    case 4:
      return "Subdirectora";
    case 5:
      return "Bodeguero";
    default:
      return null;
  }
}

export const Content = () => {
  const { data, loading, error } = useFetch("etapas");
  const { showAlert, setShowAlert } = useContext(AlertContext);
  const [currentPage, setCurrentPage] = useState(1);
  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const ITEMS_PER_PAGE = 10;
  const { execute, response } = useDeleteRequest();
  const handleDelete = async (itemId) => {
    try {
      const response = await execute("eliminarEtapa", { idEtapa: itemId });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const sortedData = data
    ? [...data].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    : [];

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const navigate = useNavigate();

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const selectedItems = sortedData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="w-75 h-35 mx-auto">
        <div className="mb-3">
          <h2 className="mx-auto p-2 display-4">Solicitudes</h2>
          <p className="display-7">
            Aquí puedes gestionar las solicitudes, ver detalles de cada etapa,
            eliminar etapas y más.
          </p>
        </div>
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-0">
              <div className="h5 text-uppercase">Solicitudes</div>
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
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {selectedItems.map(
                      (item) =>
                        item.nroEtapa !== "Rechazado" && (
                          <tr key={item._id}>
                            <td>{item.solicitudInfo.nroSolicitud}</td>
                            <td>{item.nroEtapa}</td>
                            <td>{item.infoUsuario?.solicitadoPor}</td>
                            <td>{item.etapa}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                {item.nroEtapa !== "Finalizado" &&
                                  responseLocalStorage.usuario.some(
                                    (role) =>
                                      role === "Administrador" ||
                                      role === getRole(item.nroEtapa)
                                  ) && (
                                    <>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                          navigate(
                                            item.nroEtapa === 0
                                              ? "solicitudChequeo"
                                              : `etapa${item.nroEtapa}`,
                                            {
                                              state: { item },
                                            }
                                          )
                                        }
                                      >
                                        Ver Etapa
                                      </button>
                                      {responseLocalStorage.usuario.includes(
                                        "Administrador"
                                      ) && (
                                        <button
                                          className="btn btn-danger"
                                          onClick={() => handleDelete(item._id)}
                                        >
                                          Eliminar
                                        </button>
                                      )}
                                    </>
                                  )}

                                <button
                                  className="btn btn-warning"
                                  onClick={() =>
                                    navigate(`verSolicitud`, {
                                      state: { item },
                                    })
                                  }
                                >
                                  Ver Solicitud
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                    )}
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
                  {[
                    ...Array(Math.ceil(data.length / ITEMS_PER_PAGE)).keys(),
                  ].map((number) => (
                    <button
                      key={number}
                      className="btn btn-primary m-1"
                      onClick={() => setCurrentPage(number + 1)}
                    >
                      {number + 1}
                    </button>
                  ))}
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
    </>
  );
};
