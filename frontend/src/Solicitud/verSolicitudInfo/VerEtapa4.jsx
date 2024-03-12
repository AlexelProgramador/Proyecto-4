import React, { useEffect, useState } from "react";
import usePostRequest from "../../Hooks/usePostRequest";
import { obtenerMetaData } from "../../firebase/config";

const VerEtapa4 = ({ item }) => {
    const openPdf = (fileUrl) => {
        let url = fileUrl;
        window.open(url, "_blank");
      };
      const [fileData, setFileData] = useState([]);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const fetchMetadataAndUrl = async () => {
          if (item.procesosEtapa4 && item.procesosEtapa4.urlArchivos) {
            const fileDataPromises = item.procesosEtapa4.urlArchivos?.map(
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
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        };
      
        fetchMetadataAndUrl();
      }, [item.procesosEtapa4]);

      if (isLoading) {
        return (
          <div className="contenido">
            <div className="p-4">
              <div>Cargando...</div>
            </div>
          </div>
        );
      }

      if (!item.procesosEtapa3 || !item.procesosEtapa3.fechadeenvioproveedor || !item.procesosEtapa3.estadodeenvio || !item.procesosEtapa3.comentarios) {
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
                Fecha de envio proveedor:{" "}
                <span className="text-primary">
                    {item.procesosEtapa3.fechadeenvioproveedor}
                </span>
            </div>
            <div>
                Estado de envio:{" "}
                <span className="text-primary">
                    {item.procesosEtapa3.estadodeenvio}
                </span>
            </div>
            <div>
                Comentarios:{" "}
                <span className="text-muted">{item.procesosEtapa3.comentarios}</span>
            </div>
            <div className="pl-5">
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
    </div>
);
};

export default VerEtapa4;