import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { obtenerMetaData } from "../../firebase/config";

import axios from "axios";
import "./solicitudInfo.css";

const infoSolicitud = ({ selected = 0, item }) => {
  const [numPages, setNumPages] = useState(null);
  const [paginaActual, setPaginaActual] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const openPdf = (fileUrl) => {
    let url = fileUrl;
    window.open(url, "_blank");
  };
  const productosPorPagina = 3;

  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const fetchMetadataAndUrl = async () => {
      const fileDataPromises = item.infoSolicitud.urlArchivos?.map(
        async (fileName) => {
          try {
            const metadata = await obtenerMetaData(fileName);
            const fileUrl = `${fileName}`; // Asegúrate de reemplazar esto con la ruta correcta a tus archivos en el servidor.
            return { metadata, fileUrl };
          } catch (error) {
            console.error("Error fetching metadata:", error);
          }
        }
      );

      // console.log(fileDataPromises);
      const fileData = await Promise.all(fileDataPromises);
      setFileData(fileData);
    };

    fetchMetadataAndUrl();
  }, [item.infoSolicitud.urlArchivos]);

  return (
    <>
      <div className="contenido">
        <div className="p-4" style={{fontSize: "18px"}}>
          <h1 className="h4">Información de solicitud</h1>
          <div>
            Fecha de la solicitud:{" "}
            <span className="text-primary">{item.infoSolicitud.fecha}</span>
          </div>
          <div>
            Tipo de solicitud:{" "}
            <span className="text-primary">
              {item.infoSolicitud.tipoSolicitud}
            </span>
          </div> 
          <h1 className="mt-4 h4">Información de usuario</h1>
          <div>
            Solicitada por:{" "}
            <span className="text-primary">
              {item.infoUsuario.solicitadoPor}
            </span>
          </div>
          <div>
            Anexo:{" "}
            <span className="text-primary">{item.infoUsuario.anexo}</span>
          </div>
          <div>
            Correo Electronico:{" "}
            <span className="text-primary">
              {item.infoUsuario.correo
                ? item.infoUsuario.correo
                : "No ingresado"}
            </span>
          </div>
          <div className="row mt-2 g-2">
            <div style={{ overflow: "hidden" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Tipo de empaque</th>
                  </tr>
                </thead>
                <tbody>
                  {item.infoSolicitud.productos.map((item, index) => (
                    <tr key={index}>
                      <td>{item.descripcion}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.tipoEmpaque}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pl-5">
            <h4 className="mt-2 h4">Documentos Adjuntos</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre del archivo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {fileData.map((data, index) => (
                  <tr key={index}>
                    <td>
                      {data.metadata ? data.metadata.name : "No metadata"}
                    </td>
                    <td>
                      <button
                        onClick={() => openPdf(data.fileUrl)}
                        className="btn btn-sm btn-primary rounded-pill"
                        style={{ width: "80px"}}
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default infoSolicitud;
