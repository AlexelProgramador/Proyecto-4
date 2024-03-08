import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerMetaData } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { uploadFiles } from "../firebase/config";


export const Etapa3Edit = () => {
  const openPdf = (fileUrl) => {
    let url = fileUrl;
    window.open(url, "_blank");
  };
  const [infoSolicitud, setinfoSolicitud] = useState(null);

  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editableData, setEditableData] = useState({});
  const { execute: executePut } = usePutRequest();
  const { execute: executePost } = usePostRequest();

  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.item;
  console.log(item);


  const [archivosPorFormulario, setArchivosPorFormulario] = useState(
    // Inicializar los archivos para cada formulario
    item.procesosEtapa2.formularios.map(() => [])
  );
      // Función para manejar cambios en la selección de archivos por formulario
      const handleArchivoChange = (e, formIndex) => {
        const files = Array.from(e.target.files);
        // Actualizar el estado de archivos para el formulario específico
        setArchivosPorFormulario(prevArchivos => {
          const nuevosArchivos = [...prevArchivos];
          nuevosArchivos[formIndex] = files;
          return nuevosArchivos;
        });
      };
  
  useEffect(() => {
    const fetchMetadataAndUrl = async () => {
      getinfoSolicitud();
      const fileDataPromises = item.procesosEtapa3?.map(async (proceso, index) => {
          try {
            const fileUrls = proceso.urlArchivos;
            const metadataPromises = fileUrls.map(async (url) => {
              const metadata = await obtenerMetaData(url);
              return { metadata, url };
            });
            const metadataList = await Promise.all(metadataPromises);
            return { metadataList, proceso, index };
          } catch (error) {
            console.error("Error fetching metadata:", error);
          }
        }
        
      );

      if (Array.isArray(fileDataPromises)) {
        const fileData = await Promise.all(fileDataPromises);
        setFileData(fileData);
        setIsLoading(false);
      }
    };

    fetchMetadataAndUrl();
  }, [item.procesosEtapa3]);

  const getinfoSolicitud = async () => {
    var data = {
      _id: item._id,
    };
    var url = "verEtapa";
    var response = await executePost(data, url);
    setinfoSolicitud(response);
  };


  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const urlsArchivosNuevos = await Promise.all(
        archivosPorFormulario.map(async (archivos, index) => {
          if (archivos.length > 0) {
            return await uploadFiles(
              archivos,
              item.infoSolicitud.nroSolicitud,
              infoSolicitud.nroEtapa
            );
          } else {
            return []; // Devuelve un array vacío en lugar de null
          }
        })
      );
  
      // Fusionar URLs de archivos antiguos con nuevos
      const urlsArchivosFinales = urlsArchivosNuevos.map((urlsNuevo, index) => {
        const urlsAntiguo = item.procesosEtapa3[index].urlArchivos || [];
        return [...urlsAntiguo, ...urlsNuevo];
      });
      
      // Construir los datos a enviar al backend
      const dataToSend = {
        idEtapa: item._id, // ID de la etapa
        nroEtapa: "Finalizado",
        completado: true,
        infoUsuario: item.infoUsuario,
        infoSolicitud: item.infoSolicitud,
        procesosEtapa1: item.procesosEtapa1,
        procesosEtapa2: item.procesosEtapa2,
        procesosEtapa3: item.procesosEtapa3.map((proceso, index) => ({
          ...proceso, // Información original del proceso
          ...editableData[index],
          nrofactura: numerosFacturaEditables[index], // Datos editables sobrescriben los originales si están presentes
          urlArchivos: urlsArchivosFinales[index], // Usar las URLs combinadas de archivos
        })),
      };
  
      // Realizar la solicitud al backend
      const url = "avanzarEtapa";
      const response = await executePut(url, dataToSend);
      
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error en handleSubmit:", error);
    }
  
    // Limpiar los datos editables después de enviarlos al backend
    setEditableData({});
  };

  const [numerosFacturaEditables, setNumerosFacturaEditables] = useState(() =>
  item.procesosEtapa3.reduce((acc, proceso, index) => {
    acc[index] = proceso.nrofactura.slice();
    return acc;
  }, {})
);
  
const handleEdit = (index, field, value, numeroIndex) => {
  if (field === 'nrofactura') {
    // Si el campo editado es nrofactura, actualiza solo el valor correspondiente
    if (value === "") {
      // Si el valor es una cadena vacía, elimina el número de factura
      handleDeleteNumeroFactura(index, numeroIndex);
    } else {
      setNumerosFacturaEditables(prevState => ({
        ...prevState,
        [index]: prevState[index].map((item, i) => i === numeroIndex ? value : item) // Actualiza solo el número de factura correspondiente
      }));
    }
  } else {
    // Para otros campos, actualiza el estado editableData
    setEditableData({
      ...editableData,
      [index]: {
        ...editableData[index],
        [field]: value
      }
    });
  }
};

const handleAddNumeroFactura = (index) => {
  setNumerosFacturaEditables(prevState => ({
    ...prevState,
    [index]: [...prevState[index], ""] // Agrega un nuevo elemento vacío al array
  }));
};
const handleDeleteNumeroFactura = (index, numeroIndex) => {
  setNumerosFacturaEditables(prevState => {
    const newState = { ...prevState };
    newState[index] = prevState[index].filter((_, i) => i !== numeroIndex);
    return newState;
  });
};


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
          <div>
            Solicitud en proceso. La información estará disponible aquí una vez que se complete esta etapa.
          </div>
        </div>
      </div>
    );
  }

  console.log("Llegaste a etapa3");
  return (
    <>
    <div className="w-75 h-40 mx-auto">
      <div className="card shadow-card rounded-3 border border-0 mb-5">
        <div className="card-body ">
          <div className="position-relative">
            <button className="m-2  btn btn-warning rounded-pill px-3 w-10"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Atras
            </button>
          </div>
          <h2 className="mx-auto p-2 display-4">Solicitud Etapa 3</h2>
          <p className="display-7">Esta Solicitud corresponde a: Bodega</p>
          <p className="display-7">Porfavor rellenar información corresponde a la etapa</p>
          <p className="display-7">Una vez lo considere terminado pulsar el boton "Enviar Etapa"</p>
            <div >
              <div className="fw-semibold mb-2">ORDEN DE COMPRA </div>
              <p className="display-7">
                Descripción de compra: 
              </p>
              <p className="display-7">
                N° Orden de compra:
              </p>
              {item.procesosEtapa3.map((proceso, index) => (
                <form className="row px-2" onSubmit={(e) => handleSubmit(e, procIndex)}>
                  <div className="col-md-6 form-floating mt-2 g-2">
                    <input
                      type="text"
                      className="form-control"
                      value={editableData[index]?.ncdp || proceso.ncdp}
                      onChange={(e) => handleEdit(index, "ncdp", e.target.value)}
                    />
                    <label htmlFor="floatingSelect">N° CDP</label>
                  </div>
                  <div className="col-md-6 form-floating mt-2 g-2">
                    <input
                      type="text"
                      className="form-control"
                      value={editableData[index]?.estado || proceso.estado}
                      onChange={(e) => handleEdit(index, "estado", e.target.value)}
                    />
                    <label htmlFor="floatingSelect">Estado</label>
                  </div>
                  <div className="col-md-6 form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={editableData[index]?.proveedor || proceso.proveedor}
                        onChange={(e) => handleEdit(index, "proveedor", e.target.value)}
                      />
                    <label htmlFor="floatingSelect">Proveedor</label>
                  </div>


                  {Array.isArray(numerosFacturaEditables[index]) && numerosFacturaEditables[index].map((numero, numeroIndex) => (
                  <div className="row px-2" key={numeroIndex}>
                    <div className="form-floating g-3 d-flex">
                    <input
                      className="form-control"
                      value={numero}
                      onChange={(e) => handleEdit(index, "nrofactura", e.target.value, numeroIndex)} // Modifica handleEdit para manejar el cambio en números de factura
                    />
                    <label htmlFor="floatingSelect">Número de factura</label>
                    <div
                     type="button"
                     className="btn text-center d-grid gap-2 px-4 ps-4 col-auto justify-content-center d-flex align-items-center"
                     onClick={() => handleDeleteNumeroFactura(index, numeroIndex)}          >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                       <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                     </svg>
                   </div>
                    {numeroIndex === numerosFacturaEditables[index].length - 1 && (
                    <div className="d-flex justify-content-center px-2 ">
                      <button type="button" className="btn btn-primary px-3" onClick={() => handleAddNumeroFactura(index)}>
                        +
                      </button>
                    </div>
                    )}
                    
                    </div>
                  </div>
                  ))}


                  <div className="col-md-4 form-floating mt-2 g-2">
                    <input
                      type="date"
                      className="form-control"
                      value={
                        editableData[index]?.fechaemisionfact || proceso.fechaemisionfact
                      }
                      onChange={(e) =>
                        handleEdit(index, "fechaemisionfact", e.target.value)
                      }
                   />
                    <label htmlFor="floatingSelect">Fecha emisión factura</label>
                  </div>
                  <div className="col-md-4 form-floating mt-2 g-2">
                    <input
                      type="date"
                      className="form-control"
                      value={
                        editableData[index]?.fechamaxima || proceso.fechamaxima
                      }
                      onChange={(e) =>
                        handleEdit(index, "fechamaxima", e.target.value)
                      }
                    />
                  <label htmlFor="floatingSelect">Fecha máxima de rechazo</label>
                  </div>
                  <div className="col-md-4 form-floating mt-2 g-2">
                          <select
                            className="form-select"
                            aria-label="Floating label select example"
                            value={
                              editableData[index]?.aceptadassi || proceso.aceptadassi
                            }
                            onChange={(e) =>
                              handleEdit(index, "aceptadassi", e.target.value)
                            }
                          >
                            <option value="Valor por defecto">
                              Seleccione una opción
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                          <label htmlFor="floatingSelect">Aceptado SII</label>
                  </div>
                  <div className="col-md-4 form-floating mt-2 g-2">
                    <input
                      type="date"
                      className="form-control"
                      value={
                        editableData[index]?.fechavencfact || proceso.fechavencfact
                      }
                      onChange={(e) =>
                        handleEdit(index, "fechavencfact", e.target.value)
                      }
                    />
                    <label htmlFor="floatingSelect">
                            Fecha vencimiento factura
                    </label>
                  </div>
                  <div className="col-md-8 form-floating mt-2 g-2">
                    <input
                      type="text"
                      className="form-control"
                      value={
                        editableData[index]?.montofactura || proceso.montofactura
                      }
                      onChange={(e) =>
                        handleEdit(index, "montofactura", e.target.value)
                      }
                    />
                    <label htmlFor="floatingSelect">Monto factura</label>
                  </div>
                  <div className="col-md-12 form-floating mt-2 g-2">
                    <input
                      type="text"
                      className="form-control"
                      value={
                        editableData[index]?.comentarios || proceso.comentarios
                      }
                      onChange={(e) =>
                        handleEdit(index, "comentarios", e.target.value)
                      }
                    />
                    <label htmlFor="floatingSelect">Comentario</label>
                  </div>
                  <div className="col-md-4 form-floating mt-2 g-2">
                    <input
                      type="date"
                      className="form-control"
                      value={
                        editableData[index]?.fecharecep || proceso.fecharecep
                      }
                      onChange={(e) =>
                        handleEdit(index, "fecharecep", e.target.value)
                      }
                    />
                  <label htmlFor="floatingSelect">Fecha recepción:</label>
                  </div>
                  <div className="col-md-8 form-floating mt-2 g-2">
                    <input
                      type="text"
                      className="form-control"
                      value={
                        editableData[index]?.perscargrecep || proceso.perscargrecep
                      }
                      onChange={(e) =>
                        handleEdit(index, "perscargrecep", e.target.value)
                      }
                    />
                    <label htmlFor="floatingSelect">
                      Persona a cargo de recepción
                    </label>
                  </div>
                  <div className="col-md-12 mt-2 mb-3">
                          <label htmlFor={`archivo${index}`} className="form-label">
                            Adjuntar antecedentes del/los producto/s:
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id={`archivo${index}`}
                            accept="application/pdf"
                            multiple
                            onChange={(e) => handleArchivoChange(e, index)}
                          />
                        </div>
                        <tbody>
                          {fileData[index]?.metadataList.map((file, fileIndex) => (
                            <tr key={fileIndex}>
                            <td>{file.metadata?.name || "No metadata"}</td>
                            <td style={{ textAlign: "right" }}> {/* Alineación a la derecha */}
                              <button
                                onClick={() => openPdf(file.url)}
                                className="btn btn-primary d-flex align-items-center bi bi-file-earmark-pdf"
                                style={{ width: "150px", height: "30px" }}
                              >
                                <div>Abrir documento</div>
                              </button>
                            </td>
                          </tr>
                            ))}
                          </tbody>
                    <hr className="mx-1"/>
                </form>
                ))}
              </div>

          <button
            className="m-2 btn btn-primary"
            type="submit"
            onClick={(e) => handleSave(e)}
          >
            Aceptar
          </button>
          <button
            className="m-2  btn btn-danger"
            type="button"
            onClick={() => navigate("/")}
          >
            Atrás
          </button>
        </div>
        </div>
      </div>
    </>
    
    
  );
};

export default Etapa3Edit;
