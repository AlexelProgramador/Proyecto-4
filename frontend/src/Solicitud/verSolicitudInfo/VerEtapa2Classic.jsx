import React, { useEffect, useState } from "react";
import usePostRequest from "../../Hooks/usePostRequest";
import { obtenerMetaData } from "../../firebase/config";

const verEtapa2Classic = ({ item }) => {
    const openPdf = (fileUrl) => {
      let url = fileUrl;
      window.open(url, "_blank");
    };
  
    const [fileData, setFileData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchMetadataAndUrl = async () => {
        const fileDataPromises = item.procesosEtapa2.urlArchivos.map(async (url) => {
          try {
            const metadata = await obtenerMetaData(url); // Asegúrate de que obtenerMetaData() esté definida
            return { metadata, url };
          } catch (error) {
            console.error("Error fetching metadata:", error);
            return null; // Devuelve null en caso de error
          }
        });
  
        const flattenedFileData = await Promise.all(fileDataPromises);
        setFileData(flattenedFileData.filter(data => data !== null)); // Filtra los elementos nulos
        setIsLoading(false);
      };
  
      fetchMetadataAndUrl();
    }, [item.procesosEtapa2]);

    // console.log("length", !item.procesosEtapa2)

  return (
    <div className="contenido">
        <div className="p-4" style={{fontSize: "18px"}}>
          <div className="h4">
            Orden de compra NRO{" "}{item.procesosEtapa2.nroordendecompra}
          </div>
        <div>
          Tipo de compra:{" "}
          <span className="text-primary">
            {item.procesosEtapa2.tipodecompra}
          </span>
        </div>
        <div>
          Numero de cotizaciones:{" "}
          <span className="text-primary">
            {item.procesosEtapa2.numerocotizacion}
          </span>
        </div>
        <div>
          Estado:{" "}
          <span className="text-primary">{item.procesosEtapa2.estado}</span>
        </div>
        <div>
          Comentario:{" "}
          <span className="text-muted">{item.procesosEtapa2.comentarios}</span>
        </div>
        {/* <h2 className="mb-3">
          Numero de orden de compra:{" "}
          <span className="text-primary">
            {item.procesosEtapa2.nroordendecompra}
          </span>
        </h2> */}
        <div>
          Fecha de orden de compra:{" "}
          <span className="text-primary">{item.procesosEtapa2.fechadeoc}</span>
        </div>
        <div>
          Proveedor seleccinado:{" "}
          <span className="text-primary">
            {item.procesosEtapa2.proveedorseleccionado}
          </span>
        </div>
        <div>
          Fecha entrega de proveedor:{" "}
          <span className="text-primary">
            {item.procesosEtapa2.fechaentregaproveedor}
          </span>
        </div>
        <div>
          Compra + IVA:{" "}
          <span className="text-primary">
            $ {item.procesosEtapa2.valordecompramiva}
          </span>
        </div>
        <div>
          Fecha de autocompraS:{" "}
          <span className="text-primary">
            {item.procesosEtapa2.fechaautocompra}
          </span>
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
                  <td>{data.metadata && data.metadata.name}</td> {/* Verifica si metadata está definido */}
                  <td>
                    <button
                      onClick={() => openPdf(data.url)}
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

export default verEtapa2Classic;