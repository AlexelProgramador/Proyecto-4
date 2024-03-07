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
  const handleEdit = (index, field, value) => {
    setEditableData({
      ...editableData,
      [index]: {
        ...editableData[index],
        [field]: value
      }
    });
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
          ...editableData[index], // Datos editables sobrescriben los originales si están presentes
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
                  <div className="col-md-6 form-floating mt-2 g-2">
                  <input
                    type="text"
                    className="form-control"
                    value={editableData[index]?.nrofactura || proceso.nrofactura}
                    onChange={(e) => handleEdit(index, "nrofactura", e.target.value)}
                  />
                    <label htmlFor="floatingSelect">N° Factura</label>
                  </div>
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
