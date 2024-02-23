import React, { useEffect, useState } from "react";
import usePostRequest from "../../Hooks/usePostRequest";
import { obtenerMetaData } from "../../firebase/config";


const VerEtapa5Classic = ({ item }) => {
  
    const openPdf = (fileUrl) => {
        let url = "http://127.0.0.1:8000/api/pdf/" + fileUrl + ".pdf";
        window.open(url, "_blank");
      };
      const [fileData, setFileData] = useState([]);

      const { data, error, isLoading, execute: executePost } = usePostRequest();
      const [archivos, setArchivos] = useState([]);
      
      useEffect(() => {
        const fetchMetadataAndUrl = async () => {
          const fileDataPromises = item.procesosEtapa5.urlArchivos?.map(
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
    
          const fileData = await Promise.all(fileDataPromises);
          setFileData(fileData);
        };
    
        fetchMetadataAndUrl();
      }, [item.procesosEtapa5.urlArchivos]);

    return (
    <div className="contenido">
    <div className="p-5">
        <h2 className="mb-3">
          Numero CDP:{" "}
          <span className="text-primary">{item.procesosEtapa5.ncdp}</span>
        </h2>
        <h2 className="mb-3">
          Estado:{" "}
          <span className="text-primary">{item.procesosEtapa5.estado}</span>
        </h2>
        <h2 className="mb-3">
          Proveedor:{" "}
          <span className="text-primary">{item.procesosEtapa5.proveedor}</span>
        </h2>
        <h2 className="mb-3">
          Fecha emision de factura:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.fechaemisionfact}
          </span>
        </h2>
        <h2 className="mb-3">
          Fecha maxima:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.fechamaxima}
          </span>
        </h2>
        <h2 className="mb-3">
          Aceptado SII:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.aceptadoSsi}
          </span>
        </h2>
        <h2 className="mb-3">
          Fecha vencimiento de factura:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.fechavencfact}
          </span>
        </h2>
        <h2 className="mb-3">
          Monto de factura:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.montofactura}
          </span>
        </h2>
        <div className="pl-5">
          <h2>Documentos Adjuntos: </h2>
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
                  <td>{data.metadata ? data.metadata.name : "No metadata"}</td>
                  <td>
                    <button
                         onClick={() => openPdf(data.fileUrl)}
                         className="btn btn-primary d-flex align-items-center mt-0 bi bi-file-earmark-pdf"
                      style={{ width: "100px", height: "50px" }}
                    >
                        <div>Abrir Documento</div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          fill="currentColor"
                          className="bi bi-file-earmark-pdf"
                          viewBox="0 0 16 16"
                        >
                       
                        </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerEtapa5Classic;