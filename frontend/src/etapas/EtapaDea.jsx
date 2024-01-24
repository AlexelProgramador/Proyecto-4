import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import PaginationButtons from "../Solicitud/SolicitudInputs/PaginationButtons";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";
import { BounceLoader, ClockLoader } from "react-spinners";
import { LoadingText } from "../Components/LoadingText";

export const EtapaDea = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost, response } = usePostRequest();
  const [infoSolicitud, setinfoSolicitud] = useState(null);
  const {
    data,
    error,
    isLoading: isisLoadingPut,
    execute: executePut,
  } = usePutRequest();
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Actualizando etapa");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      idEtapa: item._id,
      nroEtapa: 2,
      procesosEtapaDea: {
        aprobado: "true",
      },
    };
    const url = "avanzarEtapa";
    const response = await executePut(url, data);
    setIsLoading(false);
    navigate("/");
  };

  const getinfoSolicitud = async () => {
    var data = {
      _id: item._id,
    };
    var url = "verEtapa";
    var response = await executePost(data, url);
    setinfoSolicitud(response);
  };
  useEffect(() => {
    getinfoSolicitud();
    const interval = setInterval(() => {
      const loadingTextLength = loadingText.length;
      setLoadingText((prev) => {
        if (prev.length >= loadingTextLength + 3) {
          // Añade 3 para los puntos
          return "Actualizando etapa";
        }
        return prev + ".";
      });
    }, 500); // Actualiza cada medio segundo

    return () => {
      clearInterval(interval); // Limpia el intervalo al desmontar
      setLoadingText("Subiendo solicitud"); // Limpia el texto de carga
    };
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
                <div className="card-body">
                  <h2 className="mx-auto p-2 display-4">Solicitud Etapa 1</h2>
                  <p className="display-7">
                    Esta Solicitud corresponde a: DEA{" "}
                  </p>
                  <p className="display-7">
                    Porfavor rellenar informacion corresponde a la etapa
                  </p>
                  <p className="display-7">
                    Una vez lo considere terminado pulsar el boton "Enviar
                    Etapa"
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
                      <input
                        type="text"
                        className="form-control"
                        value={infoSolicitud.procesosEtapa1.verificarSaldo}
                        disabled
                      ></input>
                      <label htmlFor="floatingSelect">Verificar saldo</label>
                    </div>

                    <div className="col-md mt-2">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          value={infoSolicitud.procesosEtapa1.centroDeCostos}
                          disabled
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
                        style={{ height: "100px" }}
                        value={infoSolicitud.procesosEtapa1.comentario}
                        disabled
                      ></textarea>
                      <label htmlFor="floatingTextarea2">comentario</label>
                    </div>
                    <button className="m-2 btn btn-primary" type="submit">
                      Enviar Etapa
                    </button>
                    <button
                      className="m-2  btn btn-danger"
                      type="button"
                      onClick={(e) => e.preventDefault()}
                    >
                      Atras
                    </button>
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