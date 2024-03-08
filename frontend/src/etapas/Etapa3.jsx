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

    // Estado para almacenar los archivos por cada formulario
    const [archivosPorFormulario, setArchivosPorFormulario] = useState(
      // Inicializar los archivos para cada formulario
      item.procesosEtapa2.formularios.map(() => [])
    );

  const [formularios, setFormularios] = useState(() => {
    // Inicializar los formularios con base en el número de procesosEtapa2
    return item.procesosEtapa2.formularios.map(() => ({
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
    }));
  });  
  
    // Función para manejar cambios en la selección de archivos por formulario
    const handleArchivoChange = (e, formIndex) => {
      const files = Array.from(e.target.files);
      // Actualizar el estado de archivos para el formulario específico
      setArchivosPorFormulario(prevArchivos => {
        const nuevosArchivos = [...prevArchivos];
        nuevosArchivos[formIndex] = files;
        return nuevosArchivos;
      });
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

  const handleSubmit = async (e, procIndex) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Obtener las URLs de los archivos para todos los formularios
      const urlsArchivos = await Promise.all(
        archivosPorFormulario.map(async (archivos, index) => {
          if (archivos.length > 0) {
            return await uploadFiles(
              archivos,
              item.infoSolicitud.nroSolicitud,
              infoSolicitud.nroEtapa
            );
          } else {
            return null;
          }
        })
      );


      // Construir el objeto data con las URLs de los archivos
      const data = {
        idEtapa: item._id,
        nroEtapa: "Finalizado",
        completado: true,
        infoUsuario: item.infoUsuario,
        infoSolicitud: item.infoSolicitud,
        procesosEtapa1: item.procesosEtapa1,
        procesosEtapa2: item.procesosEtapa2,
        procesosEtapa3: formularios.map((formulario, index) => ({
          ncdp: formulario.ncdp,
          estado: formulario.estado,
          proveedor: formulario.proveedor,
          nrofactura: numerosFacturaPorProceso[index],
          fechaemisionfact: formulario.fechaemifactura,
          fechamaxima: formulario.fechamaxima,
          aceptadassi: formulario.aceptadassi,
          fechavencfact: formulario.fechavencfact,
          montofactura: formulario.montofactura,
          comentarios: formulario.comentarios,
          perscargrecep: formulario.perscargrecep,
          urlArchivos: urlsArchivos[index], // Usar la URL correspondiente al índice del formulario
        })),
      };
  
      const url = "avanzarEtapa";
      const response = await executePut(url, data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error en handleSubmit:", error);
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

  const [numerosFacturaPorProceso, setNumerosFacturaPorProceso] = useState(() => {
    // Inicializar los números de factura para cada proceso
    return item.procesosEtapa2.formularios.map(() => [""]);
  });
  const addNumeroFactura = (procIndex) => {
    setNumerosFacturaPorProceso((prevNumerosFactura) => {
      const nuevosNumerosFactura = [...prevNumerosFactura];
      nuevosNumerosFactura[procIndex] = [...nuevosNumerosFactura[procIndex], ""];
      return nuevosNumerosFactura;
    });
  };

  const removeNumeroFactura = (procIndex, numIndex) => {
    setNumerosFacturaPorProceso((prevNumerosFactura) => {
      const nuevosNumerosFactura = [...prevNumerosFactura];
      nuevosNumerosFactura[procIndex].splice(numIndex, 1);
      return nuevosNumerosFactura;
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
                {item.procesosEtapa2.formularios.map((proceso, procIndex) => (
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
  
                        {numerosFacturaPorProceso[procIndex].map((factura, numIndex) => (
                        <div key={numIndex} className="row px-2">
                          <div className="form-floating g-3 d-flex">
                            <input
                              type="text"
                              className="form-control"
                              value={factura}
                              onChange={(e) => {
                                const newNumerosFactura = [...numerosFacturaPorProceso];
                                newNumerosFactura[procIndex][numIndex] = e.target.value;
                                setNumerosFacturaPorProceso(newNumerosFactura);
                              }}
                            />
                            <label htmlFor="floatingSelect" >N° de Factura</label>
                            <div
                            type="button"
                            className="btn text-center d-grid gap-2 px-2 ps-4 col-auto justify-content-center d-flex align-items-center"
                            onClick={() => removeNumeroFactura(procIndex, numIndex)}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                          </div>                      
                          </div>                 
                        </div>
                        ))}
                        <div className="d-flex justify-content-center mt-2">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => addNumeroFactura(procIndex)}
                        >
                                      +
                                    </button>
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
                                        max="9999-12-31"
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
                                        max="9999-12-31"
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
                        <div className="col-md-12 mt-2 mb-3">
                          <label htmlFor={`archivo${procIndex}`} className="form-label">
                            Adjuntar antecedentes del/los producto/s:
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id={`archivo${procIndex}`}
                            accept="application/pdf"
                            multiple
                            onChange={(e) => handleArchivoChange(e, procIndex)}
                          />
                        </div>
                        <hr className="mx-1"/>
                      </form>
                      )}

                    </div>
                ))}
                <button
                  className="m-2 btn btn-primary"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
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
