import React, { useEffect, useState } from "react";
import usePostRequest from "../../Hooks/usePostRequest";
import { obtenerMetaData } from "../../firebase/config";

const verEtapa2 = ({ item }) => {
  const openPdf = (fileUrl) => {
    let url = fileUrl;
    window.open(url, "_blank");
  };

  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadataAndUrl = async () => {
      if (!Array.isArray(item.procesosEtapa2.formularios) || item.procesosEtapa2.formularios.length === 0) {
        setIsLoading(false);
        return;
      }

      const fileDataPromises = item.procesosEtapa2.urlArchivos.flatMap(async (url) => {
        try {
          const metadata = await obtenerMetaData(url);
          return { metadata, url };
        } catch (error) {
          console.error("Error fetching metadata:", error);
          return [];
        }
      });
      
      const flattenedFileData = await Promise.all(fileDataPromises);
      setFileData(flattenedFileData);
      setIsLoading(false);
    };

    fetchMetadataAndUrl();
  }, [item.procesosEtapa2]);

  console.log("length", fileData.length)
  return (
    <div className="contenido">
      <div className="p-5">
        {(isLoading || !item.procesosEtapa2.formularios || item.procesosEtapa2.formularios.length === 0) ? (
          <p>Solicitud en proceso. La información estará disponible aquí una vez que se complete esta etapa.</p>
        ) : (
          item.procesosEtapa2.formularios.map((formulario, index) => (
            <div key={index} className="mb-4">
              <h4>
                Descripcion de compra:{" "}
                <span className="text-primary">{formulario.descproducto}</span>
              </h4>
              <h4>
                Tipo de compra:{" "}
                <span className="text-primary">{formulario.tipodecompra}</span>
              </h4>
              <h4>
                Numero de cotización:{" "}
                <span className="text-primary">{formulario.numerocotizacion}</span>
              </h4>
              <h4>
                Estado:{" "}
                <span className="text-primary">{formulario.estado}</span>
              </h4>
              <h4>
                Comentario:{" "}
                <span className="text-primary">{formulario.comentarios}</span>
              </h4>
              <h4>
                Numero orden de compra:{" "}
                <span className="text-primary">{formulario.nroordendecompra}</span>
              </h4>
              <h4>
                Fecha orden de compra:{" "}
                <span className="text-primary">{formulario.fechadeoc}</span>
              </h4>
              <h4>
                Proveedor seleccionado:{" "}
                <span className="text-primary">{formulario.proveedorseleccionado}</span>
              </h4>
              <h4>
                Fecha entrega proveedor:{" "}
                <span className="text-primary">{formulario.fechaentregaproveedor}</span>
              </h4>
              <h4>
                Valor de compra mas iva:{" "}
                <span className="text-primary">{formulario.valordecompramiva}</span>
              </h4>
              <h4>
                Fecha de autorización de compra:{" "}
                <span className="text-primary">
                  {formulario.fechaautocompra}
                </span>
              </h4>
            </div>
          ))          
        )}
        {fileData.length > 0 && (
          <div className="pl-5">
            <h4>Documentos Adjuntos:</h4>
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
          )}
      </div>
    </div>
  );
};

export default verEtapa2;
