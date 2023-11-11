import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { SolicitudComponentET2 } from "../SolicitudET2/SolicitudComponentvistet2";
import { SolicitudComponentET3 } from "../SolicitudET3/SolicitudComponentvistaet3";
import { SolicitudComponentET4 } from "../SolicitudET4/SolicitudComponentvistaet4";
import { SolicitudComponentET5 } from "../SolicitudET5/SolicitudComponentet5";
import { SolicitudComponentET6 } from "../SolicitudET6/SolicitudComponentet6";
import { SolicitudComponentET7 } from "../SolicitudET7/SolicitudComponentet7";
import { SolicitudComponentET8 } from "../SolicitudET8/SolicitudComponentet8";

export const TableComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [solicitudes, setSolicitudes] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Puedes ajustar la cantidad de elementos por página según tus necesidades

  useEffect(() => {
    // Realiza solicitudes a ambas API para obtener las solicitudes y las etapas
    fetch("http://127.0.0.1:8000/api/solicitudes")
      .then((response) => response.json())
      .then((data) => setSolicitudes(data.results));

    fetch("http://127.0.0.1:8000/api/etapas")
      .then((response) => response.json())
      .then((data) => setEtapas(data.results));
  }, []);

  // Función para obtener el estado y la etapa de una solicitud
  const obtenerEstado = (solicitud) => {
    const etapaRelacionada = etapas.find(
      (etapa) => etapa.solicitudInfo._id === solicitud._id
    );
    if (etapaRelacionada) {
      return etapaRelacionada.procesosEtapa1.estado;
    }
    return "No se encontró información de estado";
  };

  const obtenerEtapa = (solicitud) => {
    const etapaRelacionada = etapas.find(
      (etapa) => etapa.solicitudInfo._id === solicitud._id
    );
    if (etapaRelacionada) {
      return etapaRelacionada.nroEtapa;
    }
    return "No se encontró información de etapa";
  };

  const handleAccion = (solicitud) => {
    const etapaRelacionada = etapas.find((etapa) => etapa.solicitudInfo._id === solicitud._id);

    if (etapaRelacionada) {
      const nroEtapa = etapaRelacionada.nroEtapa;

      let componenteSiguiente = null;

      switch (nroEtapa) {
        case 1:
          componenteSiguiente = <SolicitudComponentET2 solicitud={solicitud} />;
          break;
        case 2:
          componenteSiguiente = <SolicitudComponentET3 solicitud={solicitud} />;
          break;
        case 3:
          componenteSiguiente = <SolicitudComponentET4 solicitud={solicitud}  />;
          break;
        case 4:
          componenteSiguiente = <SolicitudComponentET5 solicitud={solicitud}  />;
          break;
        case 5:
          componenteSiguiente = <SolicitudComponentET6 solicitud={solicitud}  />;
          break;
        case 6:
          componenteSiguiente = <SolicitudComponentET7 solicitud={solicitud}  />;
          break;
        case 7:
          componenteSiguiente = <SolicitudComponentET8 solicitud={solicitud}  />;
          break;
        default:
          break;
      }

      setSelectedComponent(componenteSiguiente);
      setIsOpen(true);
    } else {
      console.log("No se encontró información de la etapa para la solicitud:", solicitud.nroSolicitud);
    }
  };

  const handleOpen = (component) => {
    setSelectedComponent(component);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedComponent(null);
    setIsOpen(false);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "en Proceso":
        return "table-warning";
      case "Completado":
        return "table-success";
      default:
        return "table-light";
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolicitudes = solicitudes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(solicitudes.length / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <table className="table table-hover text-center">
        <thead>
          <tr>
            <th>Número de Solicitud</th>
            <th>Estado</th>
            <th>Etapa</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentSolicitudes.map((solicitud, index) => (
            <tr key={index} >
              <td>{solicitud.nroSolicitud}</td>
              <td className={getEstadoColor(obtenerEstado(solicitud))} >{obtenerEstado(solicitud)}</td>
              <td>{obtenerEtapa(solicitud)}</td>
              <td>
                <button
                  onClick={() => handleAccion(solicitud)}
                  disabled={obtenerEstado(solicitud) !== "en Proceso"}
                  className="btn btn-primary"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handleClickPage(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>

      <Modal isOpen={isOpen} onRequestClose={handleClose} shouldCloseOnOverlayClick={true}>
        {selectedComponent}
      </Modal>
    </>
  );
};
