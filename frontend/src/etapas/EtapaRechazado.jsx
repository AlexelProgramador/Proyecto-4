import React, { useState, useContext } from "react";
import usePostRequest from "../Hooks/usePostRequest";
import usePutRequest from "../Hooks/usePutRequest";

import { AlertContext } from "../context/AlertContext";
import {
  UsuarioInput,
  ProductoInput,
  MotivosInput,
  PaginationButtons,
  useProductos,
} from "../solicitud/SolicitudInputs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const EtapaRechazado = () => {
  const { setShowAlert } = useContext(AlertContext);
  const location = useLocation();
  const {
    data,
    error,
    execute: executePut,
  } = usePutRequest();                                                                                                                                       
  const item = location.state?.item;
  const usuarioInfo = item?.infoUsuario || {};
  const solicitudInfo = item?.infoSolicitud || {};
  console.log(item._id);
  const navigate = useNavigate();
  const [solicitadoPor, setSolicitadoPor] = useState(usuarioInfo.solicitadoPor || "");
  const [anexo, setAnexo] = useState(usuarioInfo.anexo);
  const [correo, setCorreo] = useState(usuarioInfo.correo || "");
  const [resumen, setResumen] = useState(usuarioInfo.resumen || "");
  const [motivos, setMotivos] = useState(solicitudInfo.motivos || "");
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState(solicitudInfo.fuenteFinanciamiento || "");
  const [montoEstimado, setMontoEstimado] = useState("");
  const [archivo, setArchivo] = useState("");

  const productosPorPagina = 3;

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Construir el array de objetos de productos
    const productosData = productos.map((producto) => ({
    descripcion: producto.descripcion,
    cantidad: producto.cantidad,
    tipoEmpaque: producto.tipoEmpaque,
  }));

    // Construir objeto de datos para la actualización
    const data = {
      idEtapa: item._id,
      nroEtapa: "0",
      infoUsuario: {
        solicitadoPor: solicitadoPor,
        anexo: anexo,
        correo: correo,
        resumen: resumen,
      },
      infoSolicitud: {
        productos: productosData,
        motivos: motivos,
        fuenteFinanciamiento: fuenteFinanciamiento,
        montoEstimado: montoEstimado,
      },
    };
    
    const url = "avanzarEtapa";  // Verifica que esta sea la URL correcta
    console.log("Respuesta del servidor:", data);

    const response = await executePut(url, data);
    navigate("/");

  };

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

  console.log("productosPaginados", productosPaginados);
  return (
    <div className="w-75 h-40 mx-auto">
      <div className="card shadow-card rounded-3 border border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between pb-2">
            <h2 className="mx-auto p-2">Crear solicitud</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="row g-3"
          >
            <h2>Motivo de rechazo</h2>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={item?.motivoRechazo || ""}
              disabled
            ></textarea>
            <UsuarioInput
              solicitadoPor={solicitadoPor}
              setSolicitadoPor={setSolicitadoPor}
              anexo={anexo}
              setAnexo={setAnexo}
              correo={correo}
              setCorreo={setCorreo}
              resumen={resumen}
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
              montoEstimado={montoEstimado}
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
