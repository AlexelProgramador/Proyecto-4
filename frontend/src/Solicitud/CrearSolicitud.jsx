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
} from "./SolicitudInputs";
import { useNavigate } from "react-router-dom";

export const CrearSolicitud = () => {
  const { setShowAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [solicitadoPor, setSolicitadoPor] = useState("");
  const [fecha, setFecha] = useState("");
  const [anexo, setAnexo] = useState("");
  const [correo, setCorreo] = useState("");
  const [motivos, setMotivos] = useState("");
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState("");
  const [montoEstimado, setMontoEstimado] = useState("");
  const [imagen, setImagen] = useState("");
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
          imagen
        )
      }
      className="p-5"
    >
      <UsuarioInput
        solicitadoPor={solicitadoPor}
        setSolicitadoPor={setSolicitadoPor}
        fecha={fecha}
        setFecha={setFecha}
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
      />

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
    </form>
  );
};
