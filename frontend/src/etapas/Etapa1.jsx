import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import PaginationButtons from "../Solicitud/SolicitudInputs/PaginationButtons";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";
import { uploadFiles } from "../firebase/config";

export const Etapa1 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost, response } = usePostRequest();
  const [infoSolicitud, setinfoSolicitud] = useState(null);
  const productosPorPagina = 3;
  const [paginaActual, setPaginaActual] = useState(0);
  const [numeroDePaginas, setNumeroDePaginas] = useState(0);
  const [centroDeCostos, setCentroDeCostos] = useState("");
  const [verificarSaldo, setVerificarSaldo] = useState(0);
  const [comentario, setComentario] = useState("");
  const [archivos, setArchivos] = useState([]);
  const { data, error, isLoading, execute: executePut } = usePutRequest();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const urlArchivos = await uploadFiles(
        archivos,
        item.infoSolicitud.nroSolicitud,
        infoSolicitud.nroEtapa
      );
      const data = {
        idEtapa: item._id,
        nroEtapa: "Dea",
        procesosEtapa1: {
          centroDeCostos: centroDeCostos,
          verificarSaldo: verificarSaldo,
          comentario: comentario,
          urlArchivos: urlArchivos,
        },
      };
      const url = "avanzarEtapa";
      const response = await executePut(url, data);
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
        <>
          <div className="w-75 h-40 mx-auto">
            <div className="card shadow-card rounded-3 border border-0">
              <div className="card-body">
                <h2 className="mx-auto p-2 display-4">Solicitud Etapa 1</h2>
                <p className="display-7">
                  Esta Solicitud corresponde a: Pablo Contreras{" "}
                </p>
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
                        value={infoSolicitud.infoUsuario.solicitadoPor}
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
                              productos={infoSolicitud.infoSolicitud.productos}
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
                        value={infoSolicitud.infoSolicitud.fuenteFinanciamiento}
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
                      <label htmlFor="floatingInputGrid">Monto estimado:</label>
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
                      <option value="-1">Selecciona una opcion</option>
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
                      Adjuntar pdf(s) en caso de necesitarlo:
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
