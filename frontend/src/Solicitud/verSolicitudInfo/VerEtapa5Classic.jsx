import React, { useEffect, useState } from "react";
import usePostRequest from "../../Hooks/usePostRequest";
import { obtenerMetaData } from "../../firebase/config";


const VerEtapa5Classic = ({ item }) => {
  
    const openPdf = (fileUrl) => {
        let url = "" + fileUrl + ".pdf";
        window.open(url, "_blank");
      };
      const [fileData, setFileData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      const { data, error, execute: executePost } = usePostRequest();
      const [archivos, setArchivos] = useState([]);
      
      useEffect(() => {
        const fetchMetadataAndUrl = async () => {
          if (item.procesosEtapa5 && item.procesosEtapa5.urlArchivos) {
            const fileDataPromises = item.procesosEtapa5.urlArchivos.map(
              async (fileName) => {
                try {
                  const metadata = await obtenerMetaData(fileName);
                  const fileUrl = `${fileName}`;
                  return { metadata, fileUrl };
                } catch (error) {
                  console.error("Error fetching metadata:", error);
                }
              }
            );
    
            const fileData = await Promise.all(fileDataPromises);
            setFileData(fileData);
          }
    
          setIsLoading(false);
        };
    
        fetchMetadataAndUrl();
      }, [item.procesosEtapa5.urlArchivos]);

    if (isLoading) {
      return (
        <div className="contenido">
          <div className="p-4">
            <div>Cargando...</div>
          </div>
        </div>
      );
    }
  
    if (item.procesosEtapa5.ncdp !== null && (!item.procesosEtapa5 || !item.procesosEtapa5.ncdp || !item.procesosEtapa5.estado)) {
      return (
        <div className="contenido">
          <div className="p-4">
            <div>Solicitud en proceso. La información estará disponible aquí una vez que se complete esta etapa.</div>
          </div>
        </div>
      );
    }

    return (
    <div className="contenido">
    <div className="p-4" style={{fontSize: "18px"}}>
        <div>
          Numero CDP:{" "}
          <span className="text-primary">{item.procesosEtapa5.ncdp}</span>
        </div>
        <div>
          Estado:{" "}
          <span className="text-primary">{item.procesosEtapa5.estado}</span>
        </div>
        <div>
          Proveedor:{" "}
          <span className="text-primary">{item.procesosEtapa5.proveedor}</span>
        </div>
        <div>
          Fecha emision de factura:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.fechaemisionfact}
          </span>
        </div>
        <div>
          Fecha maxima:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.fechamaxima}
          </span>
        </div>
        <div>
          Aceptado SII:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.aceptadoSsi}
          </span>
        </div>
        <div>
          Fecha vencimiento de factura:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.fechavencfact}
          </span>
        </div>
        <div>
          Monto de factura:{" "}
          <span className="text-primary">
            {item.procesosEtapa5.montofactura}
          </span>
        </div>
        <div className="pl-5">
          <h2 className="mt-2 h4">Documentos Adjuntos</h2>
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
  );
};

export default VerEtapa5Classic;