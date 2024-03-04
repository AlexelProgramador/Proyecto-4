import React, { useState, useContext, useEffect } from "react";
import usePostRequest from "../Hooks/usePostRequest";
import { AlertContext } from "../context/AlertContext";
import { BeatLoader, ClockLoader } from "react-spinners";
import {
  UsuarioInput,
  ProductoInput,
  MotivosInput,
  useSubmitForm,
  PaginationButtons,
  useProductos,
} from "./SolicitudInputs";
import { useNavigate } from "react-router-dom";

// Correo
import enviarCorreo from "./EmaiSender"; // Asegúrate de tener la ruta correcta al componente EmailSender


export const CrearSolicitud = () => {
  const { setShowAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [solicitadoPor, setSolicitadoPor] = useState("");
  const [anexo, setAnexo] = useState("");
  const [correo, setCorreo] = useState("");
  const [resumen, setResumen] = useState("");
  const [Fechaest, setFechaest] = useState("");
  const [motivos, setMotivos] = useState("");
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState("");
  const [montoEstimado, setMontoEstimado] = useState("");
  const [archivos, setArchivos] = useState([]);
  const { execute, response } = usePostRequest();
  const productosPorPagina = 3;

  const { handleSubmit, isLoading } = useSubmitForm(execute, setShowAlert);

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
  } = useProductos([{ descripcion: "", cantidad: "", tipoEmpaque: "" }], 3);

  const [loadingText, setLoadingText] = useState("Subiendo solicitud");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev.length >= 21) {
          // "Subiendo solicitud..." tiene 20 caracteres
          return "Subiendo solicitud";
        }
        return prev + ".";
      });
    }, 500); // Actualiza cada segundo

    return () => {
      clearInterval(interval); // Limpia el intervalo al desmontar
      setLoadingText("Subiendo solicitud"); // Limpia el texto de carga
    };
  }, []);

  // console.log("prueba", response)

  const handleEnviarSolicitud = async (event) => {
    event.preventDefault();

    console.log("handleEnviarSolicitud ejecutándose...");

    // Envía la solicitud
    const nroSolicitud = await handleSubmit(
      event,
      solicitadoPor,
      anexo,
      correo,
      resumen,
      Fechaest,
      productos,
      motivos,
      fuenteFinanciamiento,
      montoEstimado,
      archivos
    );

    console.log("Solicitud enviada:", nroSolicitud);

    // Si la solicitud se envió con éxito, envía el correo de confirmación
    if (nroSolicitud) {
    const contenidoCorreo = `
    <h3>Estimado/a ${solicitadoPor},</h3>
    <p>Su solicitud realizada el ${new Date().toLocaleDateString()} con la descripción "${resumen}" ha sido ingresada correctamente, con el N° ${nroSolicitud}.</p>

    <h3>Información Solicitud</h3>
    <div><strong>Solicitado por:</strong> ${solicitadoPor}</div>
    <div><strong>Anexo:</strong> ${anexo}</div>
    <div><strong>Correo Electrónico:</strong> ${correo}</div>
    <div><strong>Resumen:</strong> ${resumen}</div>
    <div><strong>Motivos:</strong> ${motivos}</div>
    <div><strong>Fuente de Financiamiento:</strong> ${fuenteFinanciamiento}</div>
    <div><strong>Monto Estimado:</strong> ${montoEstimado}</div>
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
        ${productos.map((producto) => `
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
        const correoEnviado = await enviarCorreo(correo, contenidoCorreo, 
        `Confirmación Solicitud #${nroSolicitud}`);
      
        console.log("Correo enviado:", correoEnviado, contenidoCorreo);

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
      console.log("No paso por el if")
    }
  };

  return (
    <div className="w-75 h-40 mx-auto">
      {isLoading ? (
        <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
          <ClockLoader color="#123abc" loading={isLoading} size={100} />
          <h1 className="mt-5">{loadingText}</h1>
        </div>
      ) : (
        <div className="mb-3">
        <h2 className="mx-auto display-4">Crear Solicitud</h2>
        <p className="display-7">
          Aquí puedes realizar una nueva solicitud.
        </p>
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-2">
            <div className="h5 text-uppercase">Crear Solicitud</div>
            </div>

            <form onSubmit={handleEnviarSolicitud}
              className="row g-3"
            >
              <UsuarioInput
                solicitadoPor={solicitadoPor}
                setSolicitadoPor={setSolicitadoPor}
                setCorreo={setCorreo}
                setFechaest={setFechaest}
                setAnexo={setAnexo}
                setResumen={setResumen}
              />
              {productosPaginados.map((producto, index) => (
                <ProductoInput
                  key={index}
                  index={index}
                  producto={producto}
                  handleProductoChange={handleProductoChange}
                  handleRemoveProducto={() => handleRemoveProducto(index)} // Aquí pasas el índice
                  />               
              ))}
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={handleAddProducto}
                >
                  +
                </button>
              </div>
              <PaginationButtons
                paginaActual={paginaActual}
                setPaginaActual={setPaginaActual}
                numeroDePaginas={numeroDePaginas}
                productos={productos}
                productosPorPagina={productosPorPagina}
              />
              <MotivosInput
                motivos={motivos}
                setMotivos={setMotivos}
                fuenteFinanciamiento={fuenteFinanciamiento}
                setFuenteFinanciamiento={setFuenteFinanciamiento}
                setMontoEstimado={setMontoEstimado}
                archivos={archivos}
                setArchivos={setArchivos}
                item={null}
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
                  Atras
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
