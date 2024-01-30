import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";
import { uploadFiles } from "../firebase/config";
import { BounceLoader, ClockLoader } from "react-spinners";
import { LoadingText } from "../Components/LoadingText";

export const Etapa2 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost } = usePostRequest();
  const [infoSolicitud, setinfoSolicitud] = useState(null);
  const [motivoRechazo, setMotivoRechazo] = useState("");
  const [tipoCompra, setTipoCompra] = useState("");
  const [nrocotizacion, setNroCotizacion] = useState("");
  const [estado, setEstado] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [nroordencompra, setNroOrdenCompra] = useState("");
  const [fechaoc, setFechaoc] = useState("");
  const [proveedorselecc, setProvSelec] = useState("");
  const [fechaentregaprov, setFechaEntProv] = useState("");
  const [valorcompra, setValorCompra] = useState("");
  const [fechaautocompra, setFechaautocompra] = useState("");
  const [archivos, setArchivos] = useState([]);

  const { execute: executePut } = usePutRequest();
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
        nroEtapa: 3,
        infoUsuario: {
          solicitadoPor: item.infoUsuario.solicitadoPor,
          anexo: item.infoUsuario.anexo,
          correo: item.infoUsuario.correo,
          resumen: item.infoUsuario.resumen,
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
        procesosEtapa2: {
          tipodecompra: tipoCompra,
          numerocotizacion: nrocotizacion,
          estado: estado,
          comentarios: comentarios,
          nroordendecompra: nroordencompra,
          fechadeoc: fechaoc,
          proveedorseleccionado: proveedorselecc,
          fechaentregaproveedor: fechaentregaprov,
          valordecompramiva: valorcompra,
          fechaautocompra: fechaautocompra,
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

  const getinfoSolicitud = async () => {
    var data = {
      _id: item._id,
    };
    var url = "verEtapa";
    var response = await executePost(data, url);
    setinfoSolicitud(response);
    console.log(item);
  };

  useEffect(() => {
    getinfoSolicitud();
  }, []);
  const handleRechazar = async (e) => {
    e.preventDefault();
    console.log(motivoRechazo);
    const data = {
      idEtapa: infoSolicitud._id, // Enviar el ID de la etapa como una cadena de texto
      motivoRechazo: motivoRechazo,
      nroEtapa: "Dea",
      infoUsuario: {
        solicitadoPor: item.infoUsuario.solicitadoPor,
        anexo: item.infoUsuario.anexo,
        correo: item.infoUsuario.correo,
        resumen: item.infoUsuario.resumen,
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
                <div className="card-body">
                  <h2 className="mx-auto p-2 display-4">Solicitud Etapa 2</h2>
                  <p className="display-7">
                    Esta Solicitud corresponde a: Bastian Lapierre{" "}
                  </p>
                  <p className="display-7">
                    Porfavor rellenar informacion corresponde a la etapa
                  </p>
                  <p className="display-7">
                    Una vez lo considere terminado pulsar el boton "Enviar
                    Etapa"
                  </p>

                  <form onSubmit={handleSubmit}>
                    {/* Nuevos campos para la vista 2 */}
                    <div className="form-floating mt-2 g-2">
                      <select
                        class="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => setTipoCompra(e.target.value)}
                      >
                        <option value="Bajo 3 UTM">Bajo 3 UTM</option>
                        <option value="Compra ágil">Compra ágil</option>
                        <option value="Convenio marco">Convenio marco</option>
                        <option value="Trato directo">Trato directo</option>
                        <option value="Licitación">Licitación</option>
                        <option value="Otros">Otros</option>
                      </select>
                      <label for="floatingSelect">Tipo de compra</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={nrocotizacion}
                        onChange={(e) => setNroCotizacion(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Numero de cotizacion
                      </label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <select
                        class="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => setEstado(e.target.value)}
                      >
                        <option selected>Seleccione una opcion</option>
                        <option value="Guardada">Guardada</option>
                        <option value="Enviada">Enviada</option>
                        <option value="Autorizada">Autorizada</option>
                        <option value="Enviada a proovedor">
                          Enviada a proveedor
                        </option>
                        <option value="Aceptada">Aceptada</option>
                      </select>
                      <label for="floatingSelect">Estado</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={comentarios}
                        onChange={(e) => setComentarios(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">Comentario</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={nroordencompra}
                        onChange={(e) => setNroOrdenCompra(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Numero de orden de compra
                      </label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={fechaoc}
                        onChange={(e) => setFechaoc(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Fecha de orden de compra
                      </label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={proveedorselecc}
                        onChange={(e) => setProvSelec(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Proveedor seleccionado
                      </label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={fechaentregaprov}
                        onChange={(e) => setFechaEntProv(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Fecha entrega proveedor
                      </label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={valorcompra}
                        onChange={(e) => setValorCompra(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Valor de compra mas iva
                      </label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={fechaautocompra}
                        onChange={(e) => setFechaautocompra(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Fecha de autorizacion de compra{" "}
                      </label>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="montoEstimado" className="form-label">
                        Adjuntar antecedentes del/los producto/s:
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="archivo"
                        accept="application/pdf"
                        multiple
                        onChange={(e) => {
                          setArchivos(Array.from(e.target.files));
                        }}
                      />
                    </div>
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
