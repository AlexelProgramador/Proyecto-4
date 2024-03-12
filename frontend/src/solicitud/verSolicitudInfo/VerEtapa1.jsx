import React, { useEffect, useState } from "react";
import usePostRequest from "../../Hooks/usePostRequest";
import { obtenerMetaData } from "../../firebase/config";

const verEtapa1 = ({ item }) => {
  const openPdf = (fileUrl) => {
    let url = fileUrl;
    window.open(url, "_blank");
  };

  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadataAndUrl = async () => {
      if (item.procesosEtapa1 && item.procesosEtapa1.urlArchivos) {
        const fileDataPromises = item.procesosEtapa1.urlArchivos?.map(
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
      } 
        setIsLoading(false);
      
    };

    fetchMetadataAndUrl();
  }, [item.procesosEtapa1.urlArchivos]);

  // console.log("prueba", item.procesosEtapa1.centroDeCostos)

  if (isLoading) {
    return (
      <div className="contenido">
        <div className="p-4">
          <div>Cargando...</div>
        </div>
      </div>
    );
  }

  if ((!item.procesosEtapa1 || !item.procesosEtapa1.centroDeCostos || !item.procesosEtapa1.verificarSaldo) && item.nroEtapa !== 2 && item.nroEtapa !== "Dea" && item.nroEtapa !== 3 && item.nroEtapa !== 4 && item.nroEtapa !== 5 ) {
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
          Centro de Costos:{" "}
          <span className="text-primary">
            {item.procesosEtapa1.centroDeCostos}
          </span>
        </div>
        <div>
          Verificar Saldo:{" "}
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={item.procesosEtapa1.verificarSaldo === "1"}
              disabled
              className="ml-2"
            />
            <span className="slider"></span>
          </label>
        </div>
        <div>
          Comentario:{" "}
          <span className="text-muted">{item.procesosEtapa1.comentario}</span>
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

export default verEtapa1;
