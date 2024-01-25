import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";
import { CheckCircleFill } from "react-bootstrap-icons";
import React, { useState } from "react";
import Cookies from "js-cookie";
import useDeleteRequest from "../Hooks/useDeleteRequest";
import { eliminarArchivo } from "../firebase/config";

function getRole(nroEtapa) {
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
}

const ProgressBar = ({ value }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${value}%` }}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export const Content = () => {
  const { data, loading, error } = useFetch("etapas");
  const { showAlert, setShowAlert } = useContext(AlertContext);
  const [currentPage, setCurrentPage] = useState(1);
  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const ITEMS_PER_PAGE = 10;
  const { execute, response } = useDeleteRequest();
  // Buscador
  const [search, setSearch] = useState("");
  const handleDelete = async (itemId, item) => {
    try {
      const response = await execute("eliminarEtapa", { idEtapa: itemId });
      console.log(response);
      setShowAlert(true);
      const archivosSolicitud = item.infoSolicitud.urlArchivos;
      const archivosEtapa1 = item.procesosEtapa1?.urlArchivos || [];
      const archivosEtapa2 = item.procesosEtapa2?.urlArchivos || [];
      const archivosEtapa3 = item.procesosEtapa3?.urlArchivos || [];
      const archivosEtapa4 = item.procesosEtapa4?.urlArchivos || [];
      const archivosEtapa5 = item.procesosEtapa5?.urlArchivos || [];

      const allFiles = [
        ...archivosSolicitud,
        ...archivosEtapa1,
        ...archivosEtapa2,
        ...archivosEtapa3,
        ...archivosEtapa4,
        ...archivosEtapa5,
      ];

      const fileDeletePromises = allFiles.map(async (fileName) => {
        try {
          await eliminarArchivo(fileName);
          console.log(`Archivo ${fileName} eliminado exitosamente.`);
        } catch (error) {
          console.error("Error al eliminar el archivo:", error);
        }
      });

      // Espera a que todos los archivos se eliminen
      await Promise.all(fileDeletePromises);

      if (response) {
        const element = document.getElementById(itemId);
        if (element) {
          element.style.display = "none";
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sortedData = data
    ? [...data].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    : [];
  const filteredData = search
    ? sortedData.filter(
        (item) =>
          (item.infoSolicitud.nroSolicitud &&
            item.infoSolicitud.nroSolicitud.includes(search)) ||
          (item.procesosEtapa2.nroordendecompra &&
            item.procesosEtapa2.nroordendecompra.includes(search))
      )
    : sortedData;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  console.log(selectedItems);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);
  const navigate = useNavigate();

  const etapaPorcentaje = {
    0: 0,
    1: 14,
    Dea: 28,
    2: 42,
    3: 57,
    4: 71,
    5: 85,
    Finalizado: 100,
  };
  const handleDeleteRequest = (itemId, item) => {
    const confirmation = window.confirm(
      "¿Estás seguro de que quieres eliminar la solicitud?"
    );
    if (confirmation) {
      handleDelete(itemId, item);
    }
  };
  return (
    <>
      <div className="w-75 h-35 mx-auto">
        <div className="mb-3">
          <h2 className="mx-auto p-2 display-4">Solicitudes</h2>
          <p className="display-7">
            Aquí puedes visualizar todas las solicitudes.
          </p>
          <input
            className="form-control me-2 w-30"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar número de solicitud u orden de compra"
          />
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
                      <th scope="col">Orden de compra</th>
                      <th scope="col">Etapa</th>
                      <th scope="col">Solicitado por</th>
                      <th scope="col">Encargado</th>
                      <th scope="col">Resumen</th>
                      <th scope="col">Accion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map(
                      (item) =>
                        item.nroEtapa !== "Rechazado" && (
                          <tr key={item._id} id={item._id}>
                            <td>{item.infoSolicitud.nroSolicitud}</td>
                            <td>
                              {item.procesosEtapa2.nroordendecompra
                                ? item.procesosEtapa2.nroordendecompra
                                : "No registro"}
                            </td>
                            <td>
                              {item.nroEtapa}
                              <ProgressBar
                                value={etapaPorcentaje[item.nroEtapa]}
                              />
                            </td>
                            <td>{item.infoUsuario?.solicitadoPor}</td>
                            <td>{getRole(item.nroEtapa)}</td>
                            <td>{item.infoUsuario?.resumen}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                {responseLocalStorage.usuario.some(
                                  (role) =>
                                    role === "Administrador" ||
                                    role === getRole(item.nroEtapa)
                                ) &&
                                  item.nroEtapa !== "Finalizado" && (
                                    <>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                          navigate(
                                            item.nroEtapa === "0"
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
                                    </>
                                  )}

                                {responseLocalStorage.usuario.includes(
                                  "Administrador"
                                ) && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleDeleteRequest(item._id, item)
                                    }
                                  >
                                    Eliminar
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
