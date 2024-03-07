// MotivosInput.jsx
import React, { useEffect } from "react";
import { useState } from "react";
import { obtenerMetaData } from "../../firebase/config";

const MotivosInput = ({
  motivos,
  setMotivos,
  fuenteFinanciamiento,
  setFuenteFinanciamiento,
  montoEstimado,
  setMontoEstimado,
  ComentarioReingreso,
  setComentarioReingreso,
  archivos,
  setArchivos,
  item
}) => {
  const [fileData, setFileData] = useState([]);

  if (item !== null){

    useEffect(() => {
      const fetchMetadataAndUrl = async () => {
        const fileDataPromises = item.infoSolicitud.urlArchivos.map(
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
    }, [item.infoSolicitud.urlArchivos]);


  }


  const handleArchivoChange = (e) => {
    const newArchivos = Array.from(e.target.files);
    setArchivos([...archivos, ...newArchivos]);
  };

  const handleEliminarArchivo = (index) => {
    const newArchivos = [...archivos];
    newArchivos.splice(index, 1);
    setArchivos(newArchivos);
     // Pasar el índice al componente padre para eliminarlo de la lista de archivos antiguos
    handleEliminarArchivo(index);
  };
  // console.log("archivosAntiguos",archivosAntiguos)
  // en 104 si item == null tonces se muestra 

  return (
    <div>
      <div className="form-floating mt-2 g-2">
        <textarea
          type="text"
          className="form-control"
          id="motivos"
          value={motivos}
          onChange={(e) => setMotivos(e.target.value)}
          required
        />
        <label htmlFor="motivos" className="form-label">
          Argumente los motivos, necesidad de la compra (fundamente):
        </label>
      </div>

      <div className="form-floating mt-2 g-2">
        <textarea
          type="text"
          className="form-control"
          id="fuenteFinanciamiento"
          value={fuenteFinanciamiento}
          onChange={(e) => setFuenteFinanciamiento(e.target.value)}
          required
        />
        <label htmlFor="floatingSelect">Fuente de Financiamiento:</label>
      </div>

      <div className="form-floating mt-2 g-2">
        <input
          type="text"
          className="form-control"
          id="montoEstimado"
          value={montoEstimado}
          onChange={(e) => setMontoEstimado(e.target.value)}
          required
        />
        <label htmlFor="montoEstimado" className="form-label">
          Monto estimado de compra:
        </label>
      </div>


      <div className="form-floating mt-2 g-2">
        <input
          type="text"
          className="form-control"
          id="Comentreingreso"
          value={ComentarioReingreso}
          onChange={(e) => setComentarioReingreso(e.target.value)}
          required
        />
        <label htmlFor="Comentreingreso" className="form-label">
          Comentario de reingreso de solicitud:
        </label>
      </div>

      <div className="mt-2">
        <label htmlFor="montoEstimado" className="form-label">
          Adjuntar antecedentes del/los producto/s:
        </label>
        <input
          type="file"
          className="form-control"
          id="archivo"
          accept=".jpg, .jpeg, .pdf, .xlsx, .xls, .docx, .doc, .rar, .zip, .png"
          multiple
          onChange={handleArchivoChange}
        />
      </div>
      <div className="mt-2">
        {archivos.map((archivo, index) => (
          <div key={index} style={{fontSize: "14px"}} className="d-flex align-items-center justify-content-end">
            <span>{archivo.name}</span>
            <button
              type="button"
              className="btn btn-sm ms-2 border-0 text-center d-grid gap-2"
              onClick={() => handleEliminarArchivo(index)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
            </button>
          </div>
        ))}
        {item !== null && fileData && fileData.map((data, index) => (
          <div key={index} style={{ fontSize: "14px" }} className="d-flex align-items-center justify-content-end">
            <span>{data.metadata ? data.metadata.name : "No metadata"}</span>
            {/* <button
              type="button"
              className="btn btn-sm ms-2 border-0 text-center d-grid gap-2"
              onClick={() => handleEliminarArchivoAntiguo(index, data)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
            </button> */}
          </div>
          ))
        }
      </div>
    </div>
  );
};

export default MotivosInput;
