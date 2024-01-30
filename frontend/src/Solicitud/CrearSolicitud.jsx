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

  return (
    <div className="w-75 h-40 mx-auto">
      {isLoading ? (
        <div className="loading-modal d-flex justify-content-center align-items-center flex-column">
          <ClockLoader color="#123abc" loading={isLoading} size={100} />
          <h1 className="mt-5">{loadingText}</h1>
        </div>
      ) : (
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-2">
              <h2 className="mx-auto p-2">Crear solicitud</h2>
            </div>

            <form
              onSubmit={(event) =>
                handleSubmit(
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
                )
              }
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
              <div className="row">
                {productosPaginados.map((producto, index) => (
                  <ProductoInput
                    key={index}
                    index={index}
                    producto={producto}
                    handleProductoChange={handleProductoChange}
                  />
                ))}
                <div className="text-center">
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
              </div>
              <MotivosInput
                motivos={motivos}
                setMotivos={setMotivos}
                fuenteFinanciamiento={fuenteFinanciamiento}
                setFuenteFinanciamiento={setFuenteFinanciamiento}
                setMontoEstimado={setMontoEstimado}
                setArchivos={setArchivos}
              />
              <div>
              <button type="submit" className="btn btn-primary">
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
      )}
    </div>
  );
};
