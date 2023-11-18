import React, { useState, useContext } from "react";
import usePostRequest from "../Hooks/usePostRequest";
import { AlertContext } from "../context/AlertContext";
import {
  UsuarioInput,
  ProductoInput,
  MotivosInput,
  useSubmitForm,
  PaginationButtons,
  useProductos,
} from "../solicitud/SolicitudInputs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const EtapaRechazado = () => {
  const { setShowAlert } = useContext(AlertContext);
  const location = useLocation();

  const item = location.state.item;

  const navigate = useNavigate();
  const [solicitadoPor, setSolicitadoPor] = useState(
    item.infoUsuario.solicitadoPor
  );
  const [fecha, setFecha] = useState(item.solicitudInfo.fecha);
  const [anexo, setAnexo] = useState(item.infoUsuario.anexo);
  const [correo, setCorreo] = useState(item.infoUsuario.correo);
  const [motivos, setMotivos] = useState(item.solicitudInfo.motivos);
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState(
    item.solicitudInfo.fuenteFinanciamiento
  );
  const [montoEstimado, setMontoEstimado] = useState(
    item.solicitudInfo.montoEstimado
  );
  const [archivo, setArchivo] = useState(item.nombrePdf);
  const { execute, response } = usePostRequest();
  const productosPorPagina = 3;
  const handleSubmit = useSubmitForm(execute, setShowAlert);

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

  return (
    <div className="w-75 h-40 mx-auto">
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
                fecha,
                productos,
                motivos,
                fuenteFinanciamiento,
                montoEstimado,
                archivo
              )
            }
            className="row g-3"
          >
            <h2>Motivo de rechazo</h2>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={item.motivoRechazo}
              disabled
            ></textarea>
            <UsuarioInput
              solicitadoPor={solicitadoPor}
              setSolicitadoPor={setSolicitadoPor}
              fecha={fecha}
              setFecha={setFecha}
              setCorreo={setCorreo}
              setAnexo={setAnexo}
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
                <button className="btn btn-primary" onClick={handleAddProducto}>
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
              setArchivo={setArchivo}
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
    </div>
  );
};

export default EtapaRechazado;
