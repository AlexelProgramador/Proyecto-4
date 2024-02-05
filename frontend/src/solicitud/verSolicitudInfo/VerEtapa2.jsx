import React, { useEffect, useState } from "react";
import usePostRequest from "../../Hooks/usePostRequest";
import { obtenerMetaData } from "../../firebase/config";


const verEtapa2 = ({ item }) => {
  const openPdf = (fileUrl) => {
    let url = fileUrl;
    window.open(url, "_blank");
  };

  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const fetchMetadataAndUrl = async () => {
      const fileDataPromises = item.procesosEtapa2?.map(async (proceso) => {
        try {
          const fileName = proceso.urlArchivos[0]; // Asegúrate de ajustar esto según la estructura real
          const metadata = await obtenerMetaData(fileName);
          const fileUrl = `${fileName}`; // Asegúrate de reemplazar esto con la ruta correcta a tus archivos en el servidor.
          return { metadata, fileUrl, proceso };
        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      });

      const fileData = await Promise.all(fileDataPromises);
      setFileData(fileData);
    };

    fetchMetadataAndUrl();
  }, [item.procesosEtapa2]);

  return (
    <div className="contenido">
      <div className="p-5">
        {item.procesosEtapa2?.map((proceso, index) => (
          <div key={index} className="mb-4">
            <h2>
              Tipo de compra:{" "}
              <span className="text-primary">{proceso.tipodecompra}</span>
            </h2>
            <h2>
              Numero de cotizacion:{" "}
              <span className="text-primary">{proceso.numerocotizacion}</span>
            </h2>
            <h2>
              Estado:{" "}
              <span className="text-primary">{proceso.estado}</span>
            </h2>
            <h2>
              Comentario:{" "}
              <span className="text-primary">{proceso.comentarios}</span>
            </h2>
            <h2>
              Numero orden de compra:{" "}
              <span className="text-primary">{proceso.nroordendecompra}</span>
            </h2>
            <h2>
              Fecha orden de compra:{" "}
              <span className="text-primary">{proceso.fechadeoc}</span>
            </h2>
            <h2>
              Proveedor seleccionado:{" "}
              <span className="text-primary">{proceso.proveedorseleccionado}</span>
            </h2>
            <h2>
              Fecha entrega proveedor:{" "}
              <span className="text-primary">{proceso.fechaentregaproveedor}</span>
            </h2>
            <h2>
              Valor de compra mas iva:{" "}
              <span className="text-primary">{proceso.valordecompramiva}</span>
            </h2>
            <h2>
              Fecha de autorización de compra:{" "}
              <span className="text-primary">
                {proceso.fechaautocompra}
              </span>
            </h2>
            {/* Documentos Adjuntos */}
            <div className="pl-5">
              <h2>Documentos Adjuntos:</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre del archivo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {fileData[index] && (
                    <tr>
                      <td>{fileData[index].metadata?.name || "No metadata"}</td>
                      <td>
                        <button
                          onClick={() => openPdf(fileData[index].fileUrl)}
                          className="btn btn-primary d-flex align-items-center mt-0"
                        >
                          <div>Abrir PDF</div>
                          {/* ... (resto del código del ícono) */}
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default verEtapa2;