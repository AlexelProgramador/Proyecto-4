import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useContext, useEffect } from "react";
import { AlertContext } from "../context/AlertContext";
import { CheckCircleFill } from "react-bootstrap-icons";
import React, { useState } from "react";
import Cookies from "js-cookie";
import useDeleteRequest from "../Hooks/useDeleteRequest";
import { eliminarArchivo } from "../firebase/config";
import Pagination from "../Components/Pagination";
import SearchBar from "../Components/SearchBar";

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
    case 4:
      return "Encargado de abastecimiento";
    case 5:
      return "Bodeguero";
    case "Dea":
      return "Dea";
    default:
      return "Completado";
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

export const Pendientes = () => {
  const { data, loading, error } = useFetch("etapas");
  const { showAlert, setShowAlert } = useContext(AlertContext);
  const [currentPage, setCurrentPage] = useState(1);
  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const ITEMS_PER_PAGE = 10;
  const { execute, response } = useDeleteRequest();
  const userRoles = responseLocalStorage?.usuario || [];
  const userRole = userRoles.length > 0 ? userRoles[0] : null; // Obtener el primer rol del array, o null si no hay roles

  // console.log(userRole)

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
    ? sortedData.filter((item) => {
        const { infoSolicitud, procesosEtapa2, infoUsuario, nroEtapa } = item;
        const nroSolicitud = infoSolicitud ? infoSolicitud.nroSolicitud : "";
    // Verificar si procesosEtapa2 es un array de objetos o un objeto con un campo formularios
    let nroordendecompra = "";
    if (Array.isArray(procesosEtapa2)) {
        // Si procesosEtapa2 es un array, se asume que cada elemento puede tener el campo nroordendecompra
        nroordendecompra = procesosEtapa2.reduce((acc, proceso) => {
            if (proceso.nroordendecompra) {
                acc.push(proceso.nroordendecompra);
            } else if (proceso.formularios && proceso.formularios.length > 0) {
                // Si el proceso tiene un campo formularios, se asume que es un array de objetos
                acc.push(...proceso.formularios.map((formulario) => formulario.nroordendecompra));
            }
            return acc;
        }, []).join(",");
    } else if (procesosEtapa2 && typeof procesosEtapa2 === 'object') {
        // Si procesosEtapa2 es un objeto, se asume que es un solo objeto con el campo nroordendecompra
        if (procesosEtapa2.nroordendecompra) {
            nroordendecompra = procesosEtapa2.nroordendecompra;
        } else if (procesosEtapa2.formularios && procesosEtapa2.formularios.length > 0) {
            // Si procesosEtapa2 tiene un campo formularios, se asume que es un array de objetos
            nroordendecompra = procesosEtapa2.formularios.map((formulario) => formulario.nroordendecompra).join(",");
        }
    }
        const solicitadoPor = infoUsuario?.solicitadoPor || "";
        const resumen = infoUsuario?.resumen || "";

        // Realizar la búsqueda en todos los campos
        return (
          nroSolicitud.includes(search) ||
          nroordendecompra.includes(search) ||
          solicitadoPor.toLowerCase().includes(search.toLowerCase()) ||
          getRole(nroEtapa).toLowerCase().includes(search.toLowerCase()) ||
          resumen.toLowerCase().includes(search.toLowerCase())
        );
      })
    : sortedData;

    const seleccionados = filteredData ? filteredData.filter(item => item.nroEtapa !== "Rechazado" &&
    (userRole && (getRole(item.nroEtapa) == userRole || (userRoles[1] && getRole(item.nroEtapa) === userRoles[1]) )))  
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))  : [];
    const totalItems = seleccionados.length; // Número total de solicitudes del usuario
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE); // Calcula el número total de páginas basado en filteredData

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const selectedItems = seleccionados.slice(startIndex, endIndex);

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

  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1); // Restablecer currentPage a 1 cuando se realiza una búsqueda
  };
  return (
    <>
      <div className="mx-auto">
        <div className="mb-3">
          <h2 className="mx-auto display-4">Solicitudes Pendientes</h2>
          <p className="display-7">
            Aquí puedes gestionar las solicitudes, ver detalles de cada etapa,
            eliminar etapas y más.
          </p>
          <SearchBar search={search} setSearch={handleSearchChange} />
        </div>

        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-0">
              <div className="h5 text-uppercase">Solicitudes Pendientes</div>
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
                  <colgroup>
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "12%" }} />
                    <col style={{ width: "14%" }} />
                    <col style={{ width: "24%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">N° Solicitud</th>
                      <th scope="col">Orden de compra</th>
                      <th scope="col">Etapa</th>
                      <th scope="col">Solicitado por</th>
                      <th scope="col">Encargado</th>
                      <th scope="col">Resumen</th>
                      <th scope="col">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map((item) => {
                          // console.log("etapa", getRole(item.nroEtapa)); // Agregamos el console.log aquí
                        return (
                        item.nroEtapa !== "Rechazado" &&
                        (userRole && (getRole(item.nroEtapa) == userRole || (userRoles[1] && getRole(item.nroEtapa) === userRoles[1]) )) && (
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
                                    role == getRole(item.nroEtapa)
                                ) &&
                                  item.nroEtapa !== "Finalizado" && (
                                    <>
                                      <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                          navigate(
                                            item.nroEtapa === "0"
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
                        );
                      })}
                    {/* {Array(10 - selectedItems.length)
                      .fill()
                      .map((_, index) => (
                        <tr key={`empty-${index}`}>
                          <td colSpan="5">&nbsp;</td>
                        </tr>
                      ))} */}
                  </tbody>
                </table>
                <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
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
    </>
  );
};
