import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import PaginationButtons from "../Solicitud/SolicitudInputs/PaginationButtons";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";

export const EtapaDea = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost, response } = usePostRequest();
  const [solicitudInfo, setSolicitudInfo] = useState(null);
  const { data, error, isLoading, execute: executePut } = usePutRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      idEtapa: item._id,
      nroEtapa: 2,
      procesosEtapaDea: {
        aprobado: "true",
      },
    };
    const url = "avanzarEtapa";
    const response = await executePut(url, data);
    navigate("/");
  };

  const getSolicitudInfo = async () => {
    var data = {
      _id: item._id,
    };
    var url = "verEtapa";
    var response = await executePost(data, url);
    setSolicitudInfo(response);
  };
  useEffect(() => {
    getSolicitudInfo();
  }, []);
  return (
    <>
      {solicitudInfo ? (
        <>
          <div className="w-75 h-40 mx-auto">
            <div className="card shadow-card rounded-3 border border-0">
              <div className="card-body">
                <h2 className="mx-auto p-2 display-4">Solicitud Etapa 1</h2>
                <p className="display-7">Esta Solicitud corresponde a: DEA </p>
                <p className="display-7">
                  Porfavor rellenar informacion corresponde a la etapa
                </p>
                <p className="display-7">
                  Una vez lo considere terminado pulsar el boton "Enviar Etapa"
                </p>

                <div className="row g-2">
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        value={solicitudInfo.infoUsuario.solicitadoPor}
                        disabled
                      />
                      <label htmlFor="floatingInputGrid">Solicitado por:</label>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        value={solicitudInfo.infoUsuario.anexo}
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
                          solicitudInfo.infoUsuario.correo
                            ? solicitudInfo.infoUsuario.correo
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
                        value={solicitudInfo.solicitudInfo.fuenteFinanciamiento}
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
                        value={solicitudInfo.solicitudInfo.montoEstimado}
                        disabled
                      />
                      <label htmlFor="floatingInputGrid">Monto estimado:</label>
                    </div>
                  </div>
                </div>

                <div className="form-floating mt-2 g-2">
                  <textarea
                    className="form-control"
                    id="floatingTextarea2"
                    value={solicitudInfo.solicitudInfo.motivos}
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
                      value={solicitudInfo.procesosEtapa1.verificarSaldo}
                      disabled
                    ></input>
                    <label htmlFor="floatingSelect">Verificar saldo</label>
                  </div>

                  <div className="col-md mt-2">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        value={solicitudInfo.procesosEtapa1.centroDeCostos}
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
                      value={solicitudInfo.procesosEtapa1.comentario}
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
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
