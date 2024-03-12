import React, { useState, useContext } from "react";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";
import { uploadFiles } from "../firebase/config";

import { AlertContext } from "../context/AlertContext";
import {
  UsuarioInput,
  ProductoInput,
  MotivosInput, 
  PaginationButtons,
  useProductos
} from "../solicitud/SolicitudInputs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import enviarCorreo from "../Components/Correo";

export const EtapaRechazado = () => {
  const { setShowAlert } = useContext(AlertContext);
  const location = useLocation();
  const { data, error, execute: executePut } = usePutRequest();
  const item = location.state?.item;
  const [comentarioReingreso] = useState("");

  const usuarioInfo = item?.infoUsuario || {};
  const solicitudInfo = item?.infoSolicitud || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    solicitadoPor: usuarioInfo.solicitadoPor || "",
    anexo: usuarioInfo.anexo || "",
    correo: usuarioInfo.correo || "",
    motivos: solicitudInfo.motivos || "",
    resumen: usuarioInfo.resumen || "",
    fechaestimada: usuarioInfo.fechaestimada|| "",
    fuenteFinanciamiento: solicitudInfo.fuenteFinanciamiento || "",
    montoEstimado: solicitudInfo.montoEstimado || "",
    productos: item?.infoSolicitud.productos.map(producto => ({
      descripcion: producto.descripcion || "",
      cantidad: producto.cantidad || "",
      tipoEmpaque: producto.tipoEmpaque || "",
    })) || [],    
    archivos: item?.infoSolicitud.urlArchivos || [],
    comentarioReingreso: comentarioReingreso
  });
  
  const [archivos, setArchivos] = useState([]);


  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("datitos", item);
    const urlArchivosNuevos = await uploadFiles(
      archivos,
      item.infoSolicitud.nroSolicitud,
      item.nroEtapa
    );
    const urlArchivosAntiguos = formData.archivos.filter(url => !archivos.includes(url)); // Filtrar los archivos antiguos que no están en los nuevos archivos
    const urlArchivos = [...urlArchivosAntiguos, ...urlArchivosNuevos]; // Combinar archivos antiguos con nuevos
  
    const productosData = productos.map((producto) => ({
      descripcion: producto.descripcion,
      cantidad: producto.cantidad,
      tipoEmpaque: producto.tipoEmpaque,
    }));

    const data = {
      idEtapa: item._id,
  
      nroEtapa: "0",
      infoUsuario: {
        solicitadoPor: formData.solicitadoPor,
        anexo: formData.anexo,
        correo: formData.correo,
        resumen: formData.resumen,
        fechaestimada: formData.fechaestimada
      },
      infoSolicitud: {
        fecha: item.infoSolicitud.fecha,
        fuenteFinanciamiento: formData.fuenteFinanciamiento,
        idUsuario: item.infoSolicitud.idUsuario,
        montoEstimado: formData.montoEstimado,
        motivos: formData.motivos,
        nroSolicitud: item.infoSolicitud.nroSolicitud,
        productos: productosData,
        tipoSolicitud: item.infoSolicitud.tipoSolicitud,
        comentarioReingreso: formData.comentarioReingreso,
        urlArchivos: urlArchivos,
      },
      
    };

    const url = "avanzarEtapa";

    try {
      const response = await executePut(url, data);
      navigate("/");
      handleEnviarSolicitud(data);

    } catch (error) {
      console.error("Error al actualizar la solicitud:", error);
      setShowAlert({ type: "error", message: "Error al actualizar la solicitud" });
    }
  };

  const {
    productos,
    setProductos,
    paginaActual,
    setPaginaActual,
    numeroDePaginas,
    productosPaginados,
    handleAddProducto,
    handleRemoveProducto,
    handleProductoChange,
  } = useProductos(formData.productos, 3);
  // const [productos, setProductos] = useState(item?.infoSolicitud.productos || []);

  const handleEnviarSolicitud = async (data) => {

    console.log("Solicitud etapa 2 enviada:", data.infoSolicitud.nroSolicitud);

    // const fechaCompleta = new Date(data.infoSolicitud.fecha);
    // const fechaFormateada = fechaCompleta.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' });

    // Si la solicitud se envió con éxito, envía el correo de confirmación
    if (data.infoSolicitud.nroSolicitud) {
    const contenidoCorreo = `
    <h3>Estimado/a ${data.infoUsuario.solicitadoPor},</h3>
    <p>Su solicitud N° ${data.infoSolicitud.nroSolicitud} con la descripción "${data.infoUsuario.resumen}" ha sido ingresada nuevamente el ${new Date().toLocaleDateString()}.</p>
    <p><strong>Comentario reingreso:</strong> ${data.infoSolicitud.comentarioReingreso || ''}</p>
    <h3>Información Solicitud</h3>
    <div><strong>Solicitado por:</strong> ${data.infoUsuario.solicitadoPor}</div>
    <div><strong>Anexo:</strong> ${data.infoUsuario.anexo}</div>
    <div><strong>Correo Electrónico:</strong> ${data.infoUsuario.correo}</div>
    <div><strong>Resumen:</strong> ${data.infoUsuario.resumen}</div>
    <div><strong>Fecha de necesidad del producto:</strong> ${data.infoUsuario.fechaestimada}</div>
    <div><strong>Motivos:</strong> ${data.infoSolicitud.motivos}</div>
    <div><strong>Fuente de Financiamiento:</strong> ${data.infoSolicitud.fuenteFinanciamiento}</div>
    <div><strong>Monto Estimado:</strong> ${data.infoSolicitud.montoEstimado}</div>
    <h3>Productos Solicitados</h3>
    <table style="border: 0px; width: 100%; text-align: left">
      <thead>
        <tr>
          <th style="width: 60%;">Descripción</th>
          <th style="width: 10%;">Cantidad</th>
          <th style="width: 30%;">Tipo de Empaque</th>
        </tr>
      </thead>
      <tbody>
        ${data.infoSolicitud.productos.map((producto) => `
        <tr>
          <td>${producto.descripcion}</td>
          <td>${producto.cantidad}</td>
          <td>${producto.tipoEmpaque}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
    `;

      try {
        // Llama a la función enviarCorreo con los datos necesarios
        const correoEnviado = await enviarCorreo(item.infoUsuario.correo, contenidoCorreo, 
        `Solicitud #${data.infoSolicitud.nroSolicitud} Reingresada`);
      
        console.log("Correo enviado:", correoEnviado);

        // Realiza las acciones necesarias según el resultado del envío del correo
        if (correoEnviado) {
          // Acciones si el correo se envió correctamente
          setShowAlert({ type: "success", message: "Correo electrónico enviado con éxito" });
        } else {
          // Acciones si hubo un error al enviar el correo
          setShowAlert({ type: "error", message: "Error al enviar el correo electrónico" });
        }
      } catch (error) {
        // Manejar cualquier error que ocurra durante el envío del correo
        console.error("Error al enviar el correo electrónico:", error);
        setShowAlert({ type: "error", message: "Error al enviar el correo electrónico" });
      }
    } else {
      console.log("No hay solicitud")
    }
  };


  return (
    <div className="   mx-auto">
      <div className="mb-3">
        <h2 className="mx-auto display-4">Modificar Solicitud</h2>
        <p className="display-7">
          Aquí puedes leer el motivo de rechazo y modificar tu solicitud.
        </p>
      <div className="card shadow-card rounded-3 border border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between pb-2">
            <h2 className="h5 text-uppercase">Modificar solicitud</h2>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="h6 mb-0 d-flex align-items-center">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
              </svg>
              </div>
              <div style={{ paddingLeft: "8px" }}>Motivo de rechazo</div>
            </div>
            <div className="col-md-12 mt-2">
              <textarea
                className="form-control"
                name=""
                id=""
                cols="30"
                rows="10"
                value={item?.motivoRechazo || ""}
                disabled
              ></textarea>
            </div>
            <UsuarioInput
              solicitadoPor={formData.solicitadoPor}
              setSolicitadoPor={(value) => handleInputChange("solicitadoPor", value)}
              anexo={formData.anexo}
              setAnexo={(value) => handleInputChange("anexo", value)}
              correo={formData.correo}
              setCorreo={(value) => handleInputChange("correo", value)}
              resumen={formData.resumen}
              setResumen={(value) => handleInputChange("resumen", value)}
              fechaestimada={formData.fechaestimada}
              setFechaest={(value) => handleInputChange("fechaestimada", value)}
            />
            {productosPaginados.map((producto, index) => (
              <ProductoInput
                key={index}
                index={index}
                producto={producto}
                setProductos={setProductos}
                handleProductoChange={handleProductoChange}
                handleRemoveProducto={handleRemoveProducto}

              />
            ))}
            <div className="text-center">
              <button className="btn btn-primary" onClick={handleAddProducto}>
                +
              </button>
            </div>
            <PaginationButtons
              paginaActual={paginaActual}
              setPaginaActual={setPaginaActual}
              numeroDePaginas={numeroDePaginas}
              productos={formData.productos}
              productosPorPagina={3}
            />
            <MotivosInput
              motivos={formData.motivos}
              setMotivos={(value) => handleInputChange("motivos", value)}
              fuenteFinanciamiento={formData.fuenteFinanciamiento}
              setFuenteFinanciamiento={(value) => handleInputChange("fuenteFinanciamiento", value)}
              montoEstimado={formData.montoEstimado}
              setMontoEstimado={(value) => handleInputChange("montoEstimado", value)}
              comentarioReingreso={comentarioReingreso}
              setComentarioReingreso={(value) => handleInputChange("comentarioReingreso", value)}
              archivos={archivos} // Pasar los archivos aquí
              setArchivos={setArchivos}
              item = {item}
            />
            <div>
              <button type="submit" className="btn btn-primary me-1">
                Enviar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Atrás
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EtapaRechazado;
