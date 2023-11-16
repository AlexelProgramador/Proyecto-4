import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import PaginationButtons from "../Solicitud/SolicitudInputs/PaginationButtons";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";

export const SolicitudChequeo = () => {
  const location = useLocation();
  const item =   location.state.item;
  const { execute: executePost, response } = usePostRequest();
  const [solicitudInfo, setSolicitudInfo] = useState(null);
  const productosPorPagina = 3;
  const [paginaActual, setPaginaActual] = useState(0);
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);
  const { data, error, isLoading, execute: executePut } = usePutRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      idEtapa: item._id,
      nroEtapa: 1,
    };
    const url = "avanzarEtapa";
    const response = await executePut(url, data);
    navigate("/");
  };

  const getSolicitudInfo = async () => {
    var data = {
      nroSolicitud: item.solicitudInfo.nroSolicitud,
    };
    var url = "verEtapa";
    var response = await executePost(data, url);
    setSolicitudInfo(response);
    setNumeroDePaginas(
      Math.ceil(response.solicitudInfo.productos.length / productosPorPagina)
    );
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
                <h2 className="mx-auto p-2">Chequeo Solicitud</h2>

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
                        {solicitudInfo.solicitudInfo.productos.map(
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
                              productos={solicitudInfo.solicitudInfo.productos}
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
                  <button className="m-2 btn btn-primary" type="submit">
                    Aceptar
                  </button>
                  <button
                    className="m-2  btn btn-danger"
                    type="button"
                    onClick={(e) => e.preventDefault()}
                  >
                    atras
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
