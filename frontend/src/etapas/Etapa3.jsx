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

  
  const [formularios, setFormularios] = useState(() => {
    // Inicializar los formularios con base en el número de procesosEtapa2
    return item.procesosEtapa2.map(() => ({
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
    }));
  });  

  // const agregarFormulario = () => {
  //   setFormularios((prevFormularios) => [
  //     ...prevFormularios,
  //     {
  //       ncdp: "",
  //       estado: "",
  //       proveedor: "",
  //       nrofactura: "",
  //       fechaemifactura: "",
  //       fechamaxima: "",
  //       aceptadassi: "",
  //       fechavencfact: "",
  //       montofactura: "",
  //       comentarios: "",
  //       fecharecep: "",
  //       parscargrecep: "",
  //       urlArchivos: [],
  //     },
  //   ]);
  // };
  // const eliminarFormulario = (index) => {
  //   const nuevosFormularios = [...formularios];
  //   nuevosFormularios.splice(index, 1);
  //   setFormularios(nuevosFormularios);
  // };
  
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

  const handleInputChange = (e, formIndex, field) => {
    const { value } = e.target;
    setFormularios(prevFormularios => {
      const newFormularios = [...prevFormularios];
      newFormularios[formIndex] = {
        ...newFormularios[formIndex],
        [field]: value
      };
      return newFormularios;
    });
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
                {item.procesosEtapa2.map((proceso, procIndex) => (
                  <div key={procIndex}>
                    <div className="fw-semibold mb-2">ORDEN DE COMPRA {procIndex + 1}</div>
                    <p className="display-7">
                      Descripción de compra: {proceso.descproducto}
                    </p>
                    <p className="display-7">
                      N° Orden de compra: {proceso.nroordendecompra}
                    </p>
                    {formularios[procIndex] && (
                      <form className="row px-2" onSubmit={(e) => handleSubmit(e, procIndex)}>
                        <div className="col-md-6 form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            id={`ncdp${procIndex}`}
                            value={formularios[procIndex].ncdp}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].ncdp = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">N° CDP</label>
                        </div>
  
                        <div className="col-md-6 form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            id={`estado${procIndex}`}
                            value={formularios[procIndex].estado}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].estado = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Estado</label>
                        </div>
  
                        <div className="col-md-6 form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            id={`proveedor${procIndex}`}
                            value={formularios[procIndex].proveedor}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].proveedor = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Proveedor</label>
                        </div>
  
                        <div className="col-md-6 form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            id={`nrofactura${procIndex}`}
                            value={formularios[procIndex].nrofactura}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].nrofactura = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">N° Factura</label>
                        </div>
                        <div className="col-md-4 form-floating mt-2 g-2">
                          <input
                            type="date"
                            className="form-control"
                            id={`fechaemifactura${procIndex}`}
                            value={formularios[procIndex].fechaemifactura}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].fechaemifactura = e.target.value;
                              handleFechaEmisionChange(e, procIndex);
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Fecha emisión factura</label>
                        </div>
  
                        <div className="col-md-4 form-floating mt-2 g-2">
                          <input
                            type="date"
                            className="form-control"
                            id={`fechamaxima${procIndex}`}
                            value={formularios[procIndex].fechamaxima}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].fechamaxima = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Fecha máxima de rechazo</label>
                        </div>
  
                        <div className="col-md-4 form-floating mt-2 g-2">
                          <select
                            className="form-select"
                            id={`floatingSelect${procIndex}`}
                            aria-label="Floating label select example"
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].aceptadassi = e.target.value;
                              setFormularios(newFormularios);
                            }}
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
                            id={`fechavencfact${procIndex}`}
                            value={formularios[procIndex].fechavencfact}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].fechavencfact = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">
                            Fecha vencimiento factura
                          </label>
                        </div>
  
                        <div className="col-md-8 form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            value={formularios[procIndex].montofactura}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].montofactura = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Monto factura</label>
                        </div>
  
                        <div className="col-md-12 form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            value={formularios[procIndex].comentarios}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].comentarios = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Comentario</label>
                        </div>
  
                        <div className="col-md-4 form-floating mt-2 g-2">
                          <input
                            type="date"
                            className="form-control"
                            value={formularios[procIndex].fecharecep}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].fecharecep = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">Fecha recepción:</label>
                        </div>
  
                        <div className="col-md-8 form-floating mt-2 g-2">
                          <input
                            type="text"
                            className="form-control"
                            value={formularios[procIndex].perscargrecep}
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].perscargrecep = e.target.value;
                              setFormularios(newFormularios);
                            }}
                          />
                          <label htmlFor="floatingSelect">
                            Persona a cargo de recepción
                          </label>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label htmlFor="urlArchivo" className="form-label">
                            Adjuntar antecedentes del/los producto/s:
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id={`archivo${procIndex}`}
                            accept="application/pdf"
                            multiple
                            onChange={(e) => {
                              const newFormularios = [...formularios];
                              newFormularios[procIndex].urlArchivos = Array.from(e.target.files);
                              setFormularios(newFormularios);
                            }}
                          />
                        </div>
                        <hr className="mx-1"/>
                      </form>
                      )}
                    </div>
                ))}
                <button className="m-2 btn btn-primary" type="button" onClick={handleSubmit}>
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
