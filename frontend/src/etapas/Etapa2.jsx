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
  const { execute: executePut } = usePutRequest();
  const navigate = useNavigate();
  const [loadingText, setLoadingText] = useState("Actualizando etapa");
  const [isLoading, setIsLoading] = useState(false);
  const [archivos, setArchivos] = useState([]);
  const [formularios, setFormularios] = useState([{ descproducto: "",tipoCompra: "", nrocotizacion: "", estado: "", comentarios: "", nroordencompra: "", fechaoc: "", proveedorselecc: "", fechaentregaprov: "", valorcompra: "", fechaautocompra: "", urlArchivos: []}]);
  
  const agregarFormulario = () => {
    setFormularios((prevFormularios) => [
      ...prevFormularios,
      {
        descproducto: "",
        tipoCompra: "",
        nrocotizacion: "",
        estado: "",
        comentarios: "",
        nroordencompra: "",
        fechaoc: "",
        proveedorselecc: "",
        fechaentregaprov: "",
        valorcompra: "",
        fechaautocompra: "",
        archivos: [],
      },
    ]);
  };
  const eliminarFormulario = (index) => {
    const nuevosFormularios = [...formularios];
    nuevosFormularios.splice(index, 1);
    setFormularios(nuevosFormularios);
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
        nroEtapa: 3,
        infoUsuario: item.infoUsuario,
        infoSolicitud: item.infoSolicitud,
        procesosEtapa1: item.procesosEtapa1,
        procesosEtapa2: formularios.map((formulario) => ({
          descproducto: formulario.descproducto,
          tipodecompra: formulario.tipoCompra,
          numerocotizacion: formulario.nrocotizacion,
          estado: formulario.estado,
          comentarios: formulario.comentarios,
          nroordendecompra: formulario.nroordencompra,
          fechadeoc: formulario.fechaoc,
          proveedorseleccionado: formulario.proveedorselecc,
          fechaentregaproveedor: formulario.fechaentregaprov,
          valordecompramiva: formulario.valorcompra,
          fechaautocompra: formulario.fechaautocompra,
        urlArchivos: urlArchivos[index], // Asociar las URLs de los archivos con cada formulario
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
      infoUsuario: item.infoUsuario,
      infoSolicitud: item.infoSolicitud,
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
              <div className="card shadow-card rounded-3 border border-0 mb-5">
                <div className="card-body ">
                  <div className="position-relative">
                    <button className="m-2 btn btn-warning rounded-pill px-3 w-10" type="button" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
                      Atras
                    </button>
                    <button className="btn btn-success position-absolute top-0 end-0" onClick={agregarFormulario}>
                      Añadir Formulario
                    </button>
                  </div>
                  <h2 className="mx-auto p-2 display-4">Solicitud Etapa 2</h2>
                  <p className="display-7">Esta Solicitud corresponde a: Bastian Lapierre{" "}</p>
                  <p className="display-7">Porfavor rellenar información correspondiente a la etapa</p>
                  <p className="display-7">Una vez lo considere terminado pulsar el botón "Enviar Etapa"</p>
                  {formularios.map((formulario, index) => (
                    <div key={index}>
                  <div className="d-flex justify-content-between align-items-center">                   
                    <div className="fw-semibold">ORDEN DE COMPRA {index+1}</div>
                    {index > 0 && (
                      <button className="btn btn-danger" onClick={() => eliminarFormulario(index)}>
                      Eliminar Formulario
                      </button>
                    )}

                  </div>
                  <form className="row px-2" onSubmit={handleSubmit}>
                    {/* Nuevos campos para la vista 2 */}
                    <div className="col-md-12 form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        id={`descproducto${index}`}
                        
                        value={formularios[index].descproducto}
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].descproducto = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      />
                      <label htmlFor="floatingSelect">Descripcion del producto</label>
                    </div>

                    <div className="col-md-3 form-floating mt-2 g-2">
                      <select
                        class="form-select"
                        id={`floatingSelect${index}`}
                        aria-label="Floating label select example"
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].tipoCompra = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      >
                        <option value="Bajo 3 UTM">Bajo 3 UTM</option>
                        <option value="Compra ágil">Compra ágil</option>
                        <option value="Convenio marco">Convenio marco</option>
                        <option value="Trato directo">Trato directo</option>
                        <option value="Licitación">Licitación</option>
                        <option value="Otros">Otros</option>
                      </select>
                      <label htmlFor={`floatingSelect${index}`}>Tipo de compra</label>
                    </div>

                    <div className="col-md-6 form-floating mt-2 g-2">
                    <input
                      type="text"
                      className="form-control"
                      value={formularios[index].nrocotizacion}
                      onChange={(e) => {
                        const newFormularios = [...formularios];
                        newFormularios[index].nrocotizacion = e.target.value;
                        setFormularios(newFormularios);
                      }}
                    />
                    <label htmlFor={`nroCotizacion${index}`}>
                      Numero de cotización
                    </label>
                    </div>

                    <div className="col-md-3 form-floating mt-2 g-2">
                    <select
                      className="form-select"
                      id={`estado${index}`}
                      aria-label="Floating label select example"
                      value={formularios[index].estado}
                      onChange={(e) => {
                        const newFormularios = [...formularios];
                        newFormularios[index].estado = e.target.value;
                        setFormularios(newFormularios);
                      }}
                    >
                      <option value="" disabled>Seleccione una opción</option>
                      <option value="Guardada">Guardada</option>
                      <option value="Enviada">Enviada</option>
                      <option value="Autorizada">Autorizada</option>
                      <option value="Enviada a proveedor">Enviada a proveedor</option>
                      <option value="Aceptada">Aceptada</option>
                    </select>
                    <label htmlFor={`estado${index}`}>Estado</label>
                    </div>

                    <div className="col-md-12 form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        id={`comentarios${index}`}
                        
                        value={formularios[index].comentarios}
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].comentarios = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      />
                      <label htmlFor="floatingSelect">Comentario</label>
                    </div>

                    <div className="col-md-8 form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={formularios[index].nroordencompra}
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].nroordencompra = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      />
                      <label htmlFor="floatingSelect">
                        Numero de orden de compra
                      </label>
                    </div>

                    <div className="col-md-4 form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={formularios[index].fechaoc}
                        max="9999-12-31"
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].fechaoc = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      />
                      <label htmlFor="floatingSelect">
                        Fecha de orden de compra
                      </label>
                    </div>

                    <div className="col-md-8 form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={formularios[index].proveedorselecc}
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].proveedorselecc = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      />
                      <label htmlFor="floatingSelect">
                        Proveedor seleccionado
                      </label>
                    </div>

                    <div className="col-md-4 form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={formularios[index].fechaentregaprov}
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].fechaentregaprov = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      />
                      <label htmlFor="floatingSelect">
                        Fecha entrega proveedor
                      </label>
                    </div>

                    <div className="col-md-8 form-floating mt-2 g-2">
                      <input
                        type="text"
                        className="form-control"
                        value={formularios[index].valorcompra}
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].valorcompra = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      />
                      <label htmlFor="floatingSelect">
                        Valor de compra mas iva
                      </label>
                    </div>

                    <div className="col-md-4 form-floating mt-2 g-2">
                      <input
                        type="date"
                        className="form-control"
                        value={formularios[index].fechaautocompra}
                        onChange={(e) => {
                          const newFormularios = [...formularios];
                          newFormularios[index].fechaautocompra = e.target.value;
                          setFormularios(newFormularios);
                        }}
                      />
                      <label htmlFor={`archivo${index}`}>
                        Fecha de autorizacion de compra{" "}
                      </label>
                    </div>

                    <div className="col-md-12 mt-2 mb-3 px-1">
                    <label htmlFor="montoEstimado" className="form-label">
                        Adjuntar pdf(s) en caso de necesitarlo:
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="archivo"
                        accept=".jpg, .jpeg, .pdf, .xlsx, .xls, .docx, .doc, .rar, .zip"
                        multiple
                        onChange={(e) => {
                          setArchivos(Array.from(e.target.files));
                        }}
                      />
                    </div>
                    <hr className="mx-1"/>
                  </form>
                  </div>                
              ))}
            <button className="m-2 btn btn-primary" type="submit" onClick={handleSubmit}>
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
            </div>
          </div>
        </div>
        {/* Modal */}
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
