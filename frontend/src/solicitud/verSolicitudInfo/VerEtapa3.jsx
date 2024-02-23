import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa Link
import { obtenerMetaData } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const VerEtapa3 = ({ item }) => {
  const openPdf = (fileUrl) => {
    let url = fileUrl;
    window.open(url, "_blank");
  };
  const [fileData, setFileData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  console.log(item)

  useEffect(() => {
    const fetchMetadataAndUrl = async () => {
      const fileDataPromises = item.procesosEtapa3?.map(async (proceso) => {
          try {
            const fileUrls = proceso.urlArchivos; // Accede a todos los URLs de archivos
            const metadataPromises = fileUrls.map(async (url) => {
              const metadata = await obtenerMetaData(url);
              return { metadata, url };
            });
            const metadataList = await Promise.all(metadataPromises);
            return { metadataList, proceso };
          } catch (error) {
            console.error("Error fetching metadata:", error);
          }
        }
      );

      if (Array.isArray(fileDataPromises)) {
        const fileData = await Promise.all(fileDataPromises);
        setFileData(fileData);
        setIsLoading(false); // Se establece isLoading en falso una vez que se cargan los datos
      }
    };

    fetchMetadataAndUrl();
  }, [item.procesosEtapa3]);

  console.log("llegaste a etapa3 ");

  return (
    <div className="contenido">
      <div className="p-5">
      {isLoading ? (
          <p>Solicitud en proceso. La información estará disponible aquí una vez que se complete esta etapa.</p>
        ) : (
        <div>
        <button
          className="btn btn-primary  position-absolute top-0 end-0 mx-auto mt-5 me-15 w-15"
          onClick={() =>
            navigate(`/etapa3`,{ state: { item }, })}>
        Modificar etapa
        </button>
        {Array.isArray(item.procesosEtapa3) && item.procesosEtapa3.map((proceso, index) => (
          <div key={index} className="mb-4">
        <h4 className="mb-2">
          Numero CDP:{" "}
          <span className="text-primary">{proceso.ncdp}</span>
        </h4>
        <h4 className="mb-2">
          Estado:{" "}
          <span className="text-primary">{proceso.estado}</span>
        </h4>
        <h4 className="mb-2">
          Proveedor:{" "}
          <span className="text-primary">{proceso.proveedor}</span>
        </h4>
        <h4 className="mb-2">
          Fecha emisión de factura:{" "}
          <span className="text-primary">
            {proceso.fechaemisionfact}
          </span>
        </h4>
        <h4 className="mb-2">
          Fecha maxima:{" "}
          <span className="text-primary">
            {proceso.fechamaxima}
          </span>
        </h4>
        <h4 className="mb-2">
          Aceptado SII:{" "}
          <span className="text-primary">
            {proceso.aceptadoSsi}
          </span>
        </h4>
        <h4 className="mb-2">
          Fecha vencimiento de factura:{" "}
          <span className="text-primary">
            {proceso.fechavencfact}
          </span>
        </h4>
        <h4 className="mb-2">
          Monto de factura:{" "}
          <span className="text-primary">
            {proceso.montofactura}
          </span>
        </h4>
        <div className="pl-5">
          <h4>Documentos Adjuntos: </h4>
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
        ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default VerEtapa3;
