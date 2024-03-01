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

  // console.log(item)

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

  if (isLoading) {
    return (
      <div className="contenido">
        <div className="p-4">
          <div>Cargando...</div>
        </div>
      </div>
    );
  }
  if (!fileData.length) {
    return (
      <div className="contenido">
        <div className="p-4">
          <div>Solicitud en proceso La información estará disponible aquí una vez que se complete esta etapa.</div>
        </div>
      </div>
    );
  }

  console.log("llegaste a etapa3 ");

  return (
    <div className="contenido">
      <div className="p-4">
      {isLoading ? (
          <p>Solicitud en proceso. La información estará disponible aquí una vez que se complete esta etapa.</p>
        ) : (
        <div>
        <button
          className="btn btn-primary position-absolute top-0 end-0 mx-auto mt-4 me-4 w-15"
          onClick={() =>
            navigate(`/etapa3`,{ state: { item }, })}>
          Modificar etapa
        </button>
        {Array.isArray(item.procesosEtapa3) && item.procesosEtapa3.map((proceso, index) => (
          <div key={index} className="mb-4" style={{fontSize: "18px"}}>
        <div>
          Numero CDP:{" "}
          <span className="text-primary">{proceso.ncdp}</span>
        </div>
        <div>
          Estado:{" "}
          <span className="text-primary">{proceso.estado}</span>
        </div>
        <div>
          Proveedor:{" "}
          <span className="text-primary">{proceso.proveedor}</span>
        </div>
        <div>
          Fecha emisión de factura:{" "}
          <span className="text-primary">
            {proceso.fechaemisionfact}
          </span>
        </div>
        <div >
          Fecha maxima:{" "}
          <span className="text-primary">
            {proceso.fechamaxima}
          </span>
        </div>
        <div>
          Aceptado SII:{" "}
          <span className="text-primary">
            {proceso.aceptadoSsi}
          </span>
        </div>
        <div>
          Fecha vencimiento de factura:{" "}
          <span className="text-primary">
            {proceso.fechavencfact}
          </span>
        </div>
        <div>
          Monto de factura:{" "}
          <span className="text-primary">
            {proceso.montofactura}
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
              {fileData[index]?.metadataList.map((file, fileIndex) => (
                <tr key={fileIndex}>
                  <td>{file.metadata?.name || "No metadata"}</td>
                  <td>
                    <button
                      onClick={() => openPdf(file.url)}
                      className="btn btn-primary d-flex align-items-center mt-0 bi bi-file-earmark-pdf"
                      style={{ width: "100px", height: "50px" }}
                    >
                      <div>Abrir documento</div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        className="bi bi-file-earmark-pdf"
                        viewBox="0 0 16 16"
                      >
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                        <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
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
