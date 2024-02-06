import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { useNavigate } from "react-router-dom";
import { uploadFiles } from "../firebase/config";
import { BounceLoader, ClockLoader } from "react-spinners";
import { LoadingText } from "../Components/LoadingText";

export const Etapa3 = () => {
  const location = useLocation();
  const item = location.state.item;
  const { execute: executePost } = usePostRequest();
  const [infoSolicitud, setinfoSolicitud] = useState(null);

  const [ncdp, setNcdp] = useState("");
  const [estado, setEstado] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [nrofactura, setNrofactura] = useState("");
  const [fechaemifactura, setFechaemifactura] = useState("");
  const [fechamaxima, setFechamaxima] = useState("");
  const [aceptadassi, setAceptadassi] = useState("");
  const [fechavencfact, setFechavencfact] = useState("");
  const [montofactura, setMontofactura] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [fecharecep, setFechaRecep] = useState("");
  const [perscargrecep, setPersCargRecep] = useState("");
  const [archivos, setArchivos] = useState([]);

  const { execute: executePut } = usePutRequest();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFechaEmisionChange = (e) => {
    const selectedFechaEmision = e.target.value;
    const fechaMaxima = calcularFechaMaxima(selectedFechaEmision);
    const fechaVencimiento = calcularFechaVencimiento(selectedFechaEmision);
    
    setFechamaxima(fechaMaxima);
    setFechavencfact(fechaVencimiento);
  };

  const calcularFechaMaxima = (fechaEmision) => {
    const fechaEmisionDate = new Date(fechaEmision);
    const fechaMaximaDate = new Date(fechaEmisionDate.getTime() + 8 * 24 * 60 * 60 * 1000); // Agregar 8 días
    const fechaMaximaString = fechaMaximaDate.toISOString().split('T')[0]; // Formatear a cadena YYYY-MM-DD
    return fechaMaximaString;
  };
  const calcularFechaVencimiento = (fechaEmision) => {
    const fechaEmisionDate = new Date(fechaEmision);
    const fechaVencimientoDate = new Date(fechaEmisionDate.getTime() + 30 * 24 * 60 * 60 * 1000); // Agregar 30 días
    const fechaVencimientoString = fechaVencimientoDate.toISOString().split('T')[0]; // Formatear a cadena YYYY-MM-DD
    return fechaVencimientoString;
  };

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
        nroEtapa: "Finalizado",
        completado: true,
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
        procesosEtapa1: {
          centroDeCostos: item.procesosEtapa1.centroDeCostos,
          verificarSaldo: item.procesosEtapa1.verificarSaldo,
          comentario: item.procesosEtapa1.comentario,
          urlArchivos: item.procesosEtapa1.urlArchivos,
        },
        procesosEtapa2: item.procesosEtapa2,
        procesosEtapa3: {
          ncdp: ncdp,
          estado: estado,
          proveedor: proveedor,
          nrofactura: nrofactura,
          fechaemisionfact: fechaemifactura,
          fechamaxima: fechamaxima,
          aceptadoSsi: aceptadassi,
          fechavencfact: fechavencfact,
          montofactura: montofactura,
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
                <div className="card-body">
                  <h2 className="mx-auto p-2 display-4">Solicitud Etapa 3</h2>
                  <p className="display-7">
                    Esta Solicitud corresponde a: Bodega
                  </p>
                  <p className="display-7">
                    Porfavor rellenar informacion corresponde a la etapa
                  </p>
                  <p className="display-7">
                    Una vez lo considere terminado pulsar el boton "Enviar
                    Etapa"
                  </p>
                  <p className="display-7">
                    N° Orden de compra: {item.procesosEtapa2.nroordendecompra}
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={ncdp}
                        onChange={(e) => setNcdp(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">N° CDP</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">Estado</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={proveedor}
                        onChange={(e) => setProveedor(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">Proveedor</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={nrofactura}
                        onChange={(e) => setNrofactura(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">N° Factura</label>
                    </div>
                    <div className="form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={fechaemifactura}
                        onChange={(e) => {
                          setFechaemifactura(e.target.value);
                          handleFechaEmisionChange(e);
                        }}
                      />
                      <label htmlFor="floatingSelect">Fecha emision factura</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={fechamaxima}
                        onChange={(e) => setFechamaxima(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">Fecha maxima de rechazo</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <select
                        className="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => setAceptadassi(e.target.value)}
                      >
                        <option value="Valor por defecto">
                          Seleccione una opcion
                        </option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                      <label for="floatingSelect">Aceptado SII</label>
                    </div>
                    <div className="form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={fechavencfact}
                        onChange={(e) => setFechavencfact(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Fecha vencimiento factura
                      </label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={montofactura}
                        onChange={(e) => setMontofactura(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">Monto factura</label>
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
                        type="date"
                        className="form-control"
                        value={fecharecep}
                        onChange={(e) => setFechaRecep(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">Fecha recepcion:</label>
                    </div>

                    <div className="form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={perscargrecep}
                        onChange={(e) => setPersCargRecep(e.target.value)}
                      />
                      <label htmlFor="floatingSelect">
                        Persona a cargo de recepcion
                      </label>
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
                      Aceptar
                    </button>
                    <button
                      className="m-2  btn btn-danger"
                      type="button"
                      onClick={() => navigate("/")}
                    >
                      Atrás
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
