import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Importa Link
import { obtenerMetaData } from "../../firebase/config";

const VerEtapa3 = ({ item }) => {
  const openPdf = (fileUrl) => {
    let url = fileUrl;
    window.open(url, "_blank");
  };
  const [fileData, setFileData] = useState([]); 

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      });
  
      if (Array.isArray(fileDataPromises)) {
        const fileData = await Promise.all(fileDataPromises);
        setFileData(fileData);
        setIsLoading(false); // Se establece isLoading en falso una vez que se cargan los datos
      }
    };
  
    fetchMetadataAndUrl();
  }, [item.procesosEtapa3]);

  if (isLoading) {
    return (
      <div className="contenido">
        <div className="p-4">
          <div>Cargando...</div>
        </div>
      </div>
    );
  }
  console.log("datos", item.procesosEtapa3)
  return (
    <div className="contenido">
      <div className="p-4">
        {item.procesosEtapa3.map((proceso, index) => (
          <div key={index} className="mb-4" style={{ fontSize: "18px" }}>
            <div className="h4">
              Orden de compra N°{" "}{index+1}
            </div>
            <div>
              Orden de compra:{" "}
              <span className="text-primary">{item.procesosEtapa2.formularios[index].nroordendecompra}</span>
            </div>
            <div>
              Numero CDP: <span className="text-primary">{proceso.ncdp}</span>
            </div>
            <div>
              Estado: <span className="text-primary">{proceso.estado}</span>
            </div>
            <div>
              Proveedor: <span className="text-primary">{proceso.proveedor}</span>
            </div>
            <div className="row">
            {proceso.factura.map((factura, facturaIndex) => (
              <div key={facturaIndex} className="col-auto">
                <div className="mt-2 h5">Factura N°{" "}{facturaIndex + 1} </div>
                <div>
                  Número de factura:{" "}
                  <span className="text-primary">{factura.nrofactura}</span>
                </div>
                <div>
                  Aceptado SII: <span className="text-primary">{factura.aceptadassi}</span>
                </div>
                <div>
                  Comentario: <span className="text-primary">{factura.comentarios}</span>
                </div>
                <div>
                  Fecha emisión de factura:{" "}
                  <span className="text-primary">{factura.fechaemisionfact}</span>
                </div>
                <div>
                  Fecha máxima: <span className="text-primary">{factura.fechamaxima}</span>
                </div>
                <div>
                  Fecha vencimiento de factura:{" "}
                  <span className="text-primary">{factura.fechavencfact}</span>
                </div>
                <div>
                  Monto de factura: <span className="text-primary">{factura.montofactura}</span>
                </div>
                <div>
                  Fecha recepción de factura:{" "}
                  <span className="text-primary">{factura.fecharecep}</span>
                </div>
                <div>
                  Persona a cargo de recepción:{" "}
                  <span className="text-primary">{factura.perscargrecep}</span>
                </div>
              </div>
            ))}
            </div>
            <div className="pl-5">
              <h4 className="mt-2 h5">Documentos Adjuntos</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre del archivo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData[index]?.metadataList.map((file, fileIndex) => (
                    <tr key={fileIndex}>
                      <td>{file.metadata?.name || "No metadata"}</td>
                      <td>
                        <button
                          onClick={() => openPdf(file.url)}
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
        ))}
        <button
          className="btn btn-primary position-absolute top-0 end-0 mx-auto mt-4 me-4 w-15"
          onClick={() => navigate(`/etapa3Edit`, { state: { item } })}
        >
          Modificar etapa
        </button>
      </div>
    </div>
  );
};

export default VerEtapa3;
