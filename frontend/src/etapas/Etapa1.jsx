import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import PaginationButtons from "../Solicitud/SolicitudInputs/PaginationButtons";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";
import { uploadFiles } from "../firebase/config";
import { BounceLoader, ClockLoader } from "react-spinners";
import { LoadingText } from "../Components/LoadingText";

export const Etapa1 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost, response } = usePostRequest();
  const [infoSolicitud, setinfoSolicitud] = useState(null);
  const productosPorPagina = 3;
  const [paginaActual, setPaginaActual] = useState(0);
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [centroDeCostos, setCentroDeCostos] = useState("");
  const [verificarSaldo, setVerificarSaldo] = useState(0);
  const [comentario, setComentario] = useState("");
  const [archivos, setArchivos] = useState([]);
  const [showMotivoRechazo, setShowMotivoRechazo] = useState(false);
  const {
    data,
    error,
    isLoading: isLoadingPut,
    execute: executePut,
  } = usePutRequest();
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Actualizando etapa");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const urlArchivos = await uploadFiles(
        archivos,
        item.infoSolicitud.nroSolicitud,
        infoSolicitud.nroEtapa
      );
      const data = {
        idEtapa: item._id,
        nroEtapa: "Dea",
        infoUsuario: item.infoUsuario,
        infoSolicitud: item.infoSolicitud,
        motivoRechazo: null,
        procesosEtapa1: {
          centroDeCostos: centroDeCostos,
          verificarSaldo: verificarSaldo,
          comentario: comentario,
          urlArchivos: urlArchivos,
        },
      };
      const url = "avanzarEtapa";
      const response = await executePut(url, data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleRechazar = async (e) => {
    e.preventDefault();
    console.log(motivoRechazo);
    const data = {
      idEtapa: infoSolicitud._id, // Enviar el ID de la etapa como una cadena de texto
      motivoRechazo: motivoRechazo,
      nroEtapa: "0",
      infoUsuario: {
        solicitadoPor: item.infoUsuario.solicitadoPor,
        anexo: item.infoUsuario.anexo,
        correo: item.infoUsuario.correo,
        resumen: item.infoUsuario.resumen,
        fechaestimada: item.infoUsuario.fechaestimada
      },
      infoSolicitud: {
        fecha: item.infoSolicitud.fecha,
        fuenteFinanciamiento: item.infoSolicitud.fuenteFinanciamiento,
        idUsuario: item.infoSolicitud.idUsuario,
        montoEstimado: item.infoSolicitud.montoEstimado,
        motivos: item.infoSolicitud.motivos,
        nroSolicitud: item.infoSolicitud.nroSolicitud,
        productos: item.infoSolicitud.productos,
        tipoSolicitud: item.infoSolicitud.tipoSolicitud,
        urlArchivos: item.infoSolicitud.urlArchivos,
      },
    };
    const url = "rechazarEtapa";
    const response = await executePut(url, data);
    // Cerrar el modal manualmente
    var myModal = document.getElementById("rechazarModal");
    var modal = bootstrap.Modal.getInstance(myModal);
    modal.hide();

    navigate("/");
  };
  const getinfoSolicitud = async () => {
    var data = {
      _id: item._id,
    };
    var url = "verEtapa";
    var response = await executePost(data, url);
    setinfoSolicitud(response);
    setNumeroDePaginas(
      Math.ceil(response.infoSolicitud.productos.length / productosPorPagina)
    );
  };
  useEffect(() => {
    getinfoSolicitud();
    if (infoSolicitud && infoSolicitud.motivoRechazo) {
      setShowMotivoRechazo(true);
    }
  }, [infoSolicitud]);
  return (
    <>
      {infoSolicitud ? (
      <>
      {showMotivoRechazo && (
        <div className="  mx-auto alert alert-danger" role="alert">
          Motivo de Rechazo: {infoSolicitud.motivoRechazo}
        </div>
      )}

      {isLoading ? (
        <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
          <ClockLoader color="#123abc" loading={isLoading} size={100} />
          {<LoadingText initialText={"Actualizando Etapa"} />}
        </div>
          ) : (
            <div className="  mx-auto">
              <div className="card shadow-card rounded-3 border border-0">
              <button
                  className="m-2 btn btn-warning rounded-pill px-3 w-10"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Atrás
                </button>
                <div className="card-body">
                  <h2 className="mx-auto p-2 display-4">Solicitud Etapa 1</h2>
                  <p className="display-7">
                    Esta Solicitud corresponde a: Pablo Contreras{" "}
                  </p>
                  <p className="display-7">
                    Porfavor rellenar información corresponde a la etapa
                  </p>
                  <p className="display-7">
                    Una vez lo considere terminado pulsar el boton "Enviar
                    Etapa"
                  </p>

                  <div className="row g-2">
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          value={infoSolicitud.infoUsuario.solicitadoPor}
                          disabled
                        />
                        <label htmlFor="floatingInputGrid">
                          Solicitado por:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          value={infoSolicitud.infoUsuario.anexo}
                          disabled
                        />
                        <label htmlFor="floatingInputGrid">Anexo:</label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          value={
                            infoSolicitud.infoUsuario.correo
                              ? infoSolicitud.infoUsuario.correo
                              : "No tiene correo electronico"
                          }
                          disabled
                        />
                        <label htmlFor="floatingInputGrid">
                          Correo Electronico:
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating g-2">
                          <input
                          type="text"
                          className="form-control"
                          value={infoSolicitud.infoUsuario.resumen}
                          disabled
                          />
                        <label htmlFor="floatingInputGrid">
                          resumen:
                        </label>
                        </div>
                      </div>
                    <div className="col-md-6">
                      <div className="form-floating g-2">
                        <input
                          type="text"
                          className="form-control"
                          value={infoSolicitud.infoUsuario.fechaestimada}
                          disabled
                        />
                        <label htmlFor="floatingInputGrid">Fecha de necesidad del producto:</label>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 g-2">
                    <div style={{ overflow: "hidden" }}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Tipo de empaque</th>
                          </tr>
                        </thead>
                        <tbody>
                          {infoSolicitud.infoSolicitud.productos.map(
                            (item, index) => (
                              <tr key={index}>
                                <td>{item.descripcion}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.tipoEmpaque}</td>
                              </tr>
                            )
                          )}
                          <tr>
                            <td></td>
                            <td>
                              <PaginationButtons
                                paginaActual={paginaActual}
                                setPaginaActual={setPaginaActual}
                                numeroDePaginas={numeroDePaginas}
                                productos={
                                  infoSolicitud.infoSolicitud.productos
                                }
                                productosPorPagina={productosPorPagina}
                              />
                            </td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-md">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          value={
                            infoSolicitud.infoSolicitud.fuenteFinanciamiento
                          }
                          disabled
                        />
                        <label htmlFor="floatingInputGrid">
                          Fuente de financiamiento:
                        </label>
                      </div>
                    </div>
                    <div className="col-md">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          value={infoSolicitud.infoSolicitud.montoEstimado}
                          disabled
                        />
                        <label htmlFor="floatingInputGrid">
                          Monto estimado:
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="form-floating mt-2 g-2">
                    <textarea
                      className="form-control"
                      id="floatingTextarea2"
                      value={infoSolicitud.infoSolicitud.motivos}
                      style={{ height: "100px" }}
                      disabled
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Motivo de compra</label>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mt-2">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => setVerificarSaldo(e.target.value)}
                      >
                        <option value="-1">Selecciona una opción</option>
                        <option value="1">Si</option>
                        <option value="0">No</option>
                      </select>
                      <label htmlFor="floatingSelect">Verificar saldo</label>
                    </div>

                    <div className="col-md mt-2">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          value={centroDeCostos}
                          onChange={(e) => setCentroDeCostos(e.target.value)}
                        />
                        <label htmlFor="floatingInputGrid">
                          Centro de Costos (CC)
                        </label>
                      </div>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <textarea
                        className="form-control"
                        id="floatingTextarea2"
                        value={comentario}
                        style={{ height: "100px" }}
                        onChange={(e) => setComentario(e.target.value)}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">comentario</label>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="montoEstimado" className="form-label">
                        Adjuntar documentos en caso de necesitarlo:
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="archivo"
                        accept=".jpg, .jpeg, .pdf, .xlsx, .xls, .docx, .doc, .rar, .zip"
                        multiple
                        onChange={(e) => {
                          setArchivos(Array.from(e.target.files));
                        }}
                      />
                    </div>

                    <button className="m-2 btn btn-primary" type="submit">
                      Enviar Etapa
                    </button>
                    <button
                      className="m-2  btn btn-danger"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#rechazarModal"
                    >
                      Rechazar
                    </button>

                    <div
                      className="modal fade"
                      id="rechazarModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Motivo de Rechazo
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form>
                              <div className="mb-3">
                                <label
                                  htmlFor="message-text"
                                  className="col-form-label"
                                >
                                  Motivo:
                                </label>
                                <textarea
                                  className="form-control"
                                  id="message-text"
                                  value={motivoRechazo}
                                  onChange={(e) =>
                                    setMotivoRechazo(e.target.value)
                                  }
                                ></textarea>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Cancelar
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={handleRechazar}
                            >
                              Enviar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
          <BounceLoader color="#123abc" loading={true} size={100} />
          {<LoadingText initialText={"Cargando"} />}
        </div>
      )}
    </>
  );
};
