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
  const [archivos] = useState([]);

  const { execute: executePut } = usePutRequest();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  
  const [formularios, setFormularios] = useState([
    {
      ncdp: "",
      estado: "",
      proveedor: "",
      nrofactura: "",
      fechaemifactura: "",
      fechamaxima: "",
      aceptadassi: "",
      fechavencfact: "",
      montofactura: "",
      comentarios: "",
      fecharecep: "",
      perscargrecep: "",
      urlArchivos: [],
    },
  ]);  
  const agregarFormulario = () => {
    setFormularios((prevFormularios) => [
      ...prevFormularios,
      {
        ncdp: "",
        estado: "",
        proveedor: "",
        nrofactura: "",
        fechaemifactura: "",
        fechamaxima: "",
        aceptadassi: "",
        fechavencfact: "",
        montofactura: "",
        comentarios: "",
        fecharecep: "",
        parscargrecep: "",
        urlArchivos: [],
      },
    ]);
  };
  const eliminarFormulario = (index) => {
    const nuevosFormularios = [...formularios];
    nuevosFormularios.splice(index, 1);
    setFormularios(nuevosFormularios);
  };
  
  const handleFechaEmisionChange = (e, index) => {
    const selectedFechaEmision = e.target.value;
    const fechaMaxima = calcularFechaMaxima(selectedFechaEmision);
    const fechaVencimiento = calcularFechaVencimiento(selectedFechaEmision);
    const newFormularios = [...formularios];
    newFormularios[index].fechaemifactura = selectedFechaEmision;
    newFormularios[index].fechamaxima = fechaMaxima;
    newFormularios[index].fechavencfact = fechaVencimiento;
    setFormularios(newFormularios);
  };

  const calcularFechaMaxima = (fechaEmision) => {
    const fechaEmisionDate = new Date(fechaEmision);
    const fechaMaximaDate = new Date(
      fechaEmisionDate.getTime() + 8 * 24 * 60 * 60 * 1000
    ); // Agregar 8 días
    const fechaMaximaString = fechaMaximaDate.toISOString().split("T")[0]; // Formatear a cadena YYYY-MM-DD
    return fechaMaximaString;
  };

  const calcularFechaVencimiento = (fechaEmision) => {
    const fechaEmisionDate = new Date(fechaEmision);
    const fechaVencimientoDate = new Date(
      fechaEmisionDate.getTime() + 30 * 24 * 60 * 60 * 1000
    ); // Agregar 30 días
    const fechaVencimientoString = fechaVencimientoDate.toISOString().split("T")[0]; // Formatear a cadena YYYY-MM-DD
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
        infoUsuario: item.infoUsuario,
        infoSolicitud: item.infoSolicitud,
        procesosEtapa1: item.procesosEtapa1,
        procesosEtapa2: item.procesosEtapa2,
        procesosEtapa3: formularios.map((formulario, formIndex) => ({
          ncdp: formulario.ncdp,
          estado: formulario.estado,
          proveedor: formulario.proveedor,
          nrofactura: formulario.nrofactura,
          fechaemisionfact: formulario.fechaemifactura,
          fechamaxima: formulario.fechamaxima,
          aceptadassi: formulario.aceptadassi,
          fechavencfact: formulario.fechavencfact,
          montofactura: formulario.montofactura,
          urlArchivos: formulario.urlArchivos,
        })),
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
            {item.procesosEtapa2.map((proceso, procIndex) => (
              formularios.map((formulario, formIndex) => (
                <div className="w-75 h-40 mx-auto" key={formIndex}>
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
                        <button className="btn btn-success position-absolute top-0 end-0 mx-auto w-10 " onClick={agregarFormulario}>
                          Añadir Formulario
                        </button>
                        <button className="btn btn-danger position-absolute top-0 end-0 mx-auto me-15 w-10 " onClick={() => eliminarFormulario(formIndex)}>
                          Eliminar Formulario
                        </button>
                      </div>
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
                        Descripcion de compra: {proceso.descproducto} {/* Mostrar el número de orden de compra del item actual */}
                      </p>
                      <p className="display-7">
                        N° Orden de compra: {proceso.nroordendecompra} {/* Mostrar el número de orden de compra del item actual */}
                      </p>
                      <form onSubmit={handleSubmit}>
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            id={`ncdp${formIndex}`}
                            value={formularios[formIndex].ncdp}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].ncdp = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">N° CDP</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            id={`estado${formIndex}`}
                            value={formularios[formIndex].estado}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].estado = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Estado</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            id={`proveedor${formIndex}`}
                            value={formularios[formIndex].proveedor}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].proveedor = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Proveedor</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            id={`nrofactura${formIndex}`}
                            value={formularios[formIndex].nrofactura}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].nrofactura = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">N° Factura</label>
                        </div>
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="date"
                            className="form-control"
                            id={`fechaemifactura${formIndex}`}
                            value={formularios[formIndex].fechaemifactura}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].fechaemifactura = e.target.value;
                              handleFechaEmisionChange(e, formIndex);
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Fecha emisión factura</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="date"
                            className="form-control"
                            id={`fechamaxima${formIndex}`}
                            value={formularios[formIndex].fechamaxima}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].fechamaxima = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Fecha máxima de rechazo</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <select
                            className="form-select"
                            id={`floatingSelect${formIndex}`}
                            aria-label="Floating label select example"
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].aceptadassi = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          >
                            <option value="Valor por defecto">
                              Seleccione una opcion
                            </option>
                            <option value="Si">Si</option>
                            <option value="No">No</option>
                          </select>
                          <label htmlFor="floatingSelect">Aceptado SII</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="date"
                            className="form-control"
                            id={`fechavencfact${formIndex}`}
                            value={formularios[formIndex].fechavencfact}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].fechavencfact = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">
                            Fecha vencimiento factura
                          </label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            value={formularios[formIndex].montofactura}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].montofactura = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Monto factura</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            value={formularios[formIndex].comentarios}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].comentarios = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Comentario</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="date"
                            className="form-control"
                            value={formularios[formIndex].fecharecep}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].fecharecep = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Fecha recepcion:</label>
                        </div>
  
                        <div className="form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            value={formularios[formIndex].perscargrecep}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].perscargrecep = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">
                            Persona a cargo de recepcion
                          </label>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="urlArchivo" className="form-label">
                            Adjuntar antecedentes del/los producto/s:
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id={`archivo${formIndex}`}
                            accept="application/pdf"
                            multiple
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[formIndex].urlArchivos = Array.from(e.target.files);
                              setFormularios(newFormularios);
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
              ))
            ))}
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
