import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import PaginationButtons from "../Solicitud/SolicitudInputs/PaginationButtons";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";
import { BounceLoader, ClockLoader } from "react-spinners";
import { LoadingText } from "../Components/LoadingText";

export const SolicitudChequeo = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost, response } = usePostRequest();
  const [infoSolicitud, setinfoSolicitud] = useState(null);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const productosPorPagina = 3;
  const [paginaActual, setPaginaActual] = useState(0);
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);
  const {
    data,
    error,
    isLoading: isLoadingPut,
    execute: executePut,
  } = usePutRequest();
  const [loadingText, setLoadingText] = useState("Actualizando etapa");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      idEtapa: item._id,

      nroEtapa: 1,
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
    const url = "avanzarEtapa";

    const response = await executePut(url, data);
    console.log(response);
    setIsLoading(false);
    navigate("/");
  };

  
  const handleRechazar = async (e) => {
    e.preventDefault();
    console.log(motivoRechazo);
    const data = {
      idEtapa: infoSolicitud._id, // Enviar el ID de la etapa como una cadena de texto
      motivoRechazo: motivoRechazo,
      nroEtapa: "Rechazado",
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
        montoEstimado: item.infoSolicitud.idUsuario,
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
  }, []);
  return (
    <>
      {infoSolicitud ? (
        isLoading ? (
          <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
            <ClockLoader color="#123abc" loading={isLoading} size={100} />
            {<LoadingText initialText={"Actualizando Etapa"} />}
          </div>
        ) : (
          <>
            <div className="w-75 h-40 mx-auto">
              <div className="card shadow-card rounded-3 border border-0">
                <button
                  className="m-2 btn btn-warning rounded-pill px-3 w-10"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Atras
                </button>
                <div className="card-body">
                  <h2 className="mx-auto p-2 display-4">Solicitud Etapa 0</h2>
                  <p className="display-7">
                    Esta Solicitud corresponde a: Secretaria
                  </p>
                  <p className="display-7">
                    Porfavor chequear informacion corresponde a la etapa
                  </p>
                  <p className="display-7">
                    Una vez lo considere terminado pulsar el boton "Aceptar"
                  </p>
                  <div className="row g-2">
                    <div className="col-md">
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
                    <div className="col-md">
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
                    <div className="col-md">
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
                    <div className="row">
                      <div className="col">
                        <div className="form-floating mt-2 g-2">
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
                      <div className="col">
                          <div className="form-floating mt-2 g-2">
                          <input
  type="text"
  className="form-control"
  value={infoSolicitud.infoUsuario.fechaestimada}
  disabled
/>
<label htmlFor="floatingInputGrid">Fecha estimada:</label>


                        </div>
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
                    <button className="m-2 btn btn-primary" type="submit">
                      Aceptar
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
                              Motivo de rechazo
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
                              Cerrar
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
          </>
        )
      ) : (
        <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
          <BounceLoader color="#123abc" loading={true} size={100} />
          {<LoadingText initialText={"Cargando"} />}
        </div>
      )}
    </>
  );
};
