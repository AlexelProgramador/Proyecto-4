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
  const { data, error, execute: executePut } = usePutRequest();
  const item = location.state?.item;

  const usuarioInfo = item?.infoUsuario || {};
  const solicitudInfo = item?.infoSolicitud || {};

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    solicitadoPor: usuarioInfo.solicitadoPor || "",
    anexo: usuarioInfo.anexo || "",
    correo: usuarioInfo.correo || "",
    motivos: usuarioInfo.motivos || "",
    resumen: usuarioInfo.resumen || "",
    fechaestimada: usuarioInfo.fechaestimada|| "",
    fuenteFinanciamiento: solicitudInfo.fuenteFinanciamiento || "",
    montoEstimado: solicitudInfo.montoEstimado || "",

  });

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        urlArchivos: item.infoSolicitud.urlArchivos,
      },
    };

    const url = "avanzarEtapa";

    try {
      const response = await executePut(url, data);
      navigate("/");
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
    handleProductoChange,
  } = useProductos([{ descripcion: "", cantidad: "", tipoEmpaque: "" }], 3);

  return (
    <div className="w-75 h-40 mx-auto">
      <div className="card shadow-card rounded-3 border border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between pb-2">
            <h2 className="mx-auto p-2">Crear solicitud</h2>
          </div>

          <form onSubmit={handleSubmit} className="row g-3">
            <h2>Motivo de rechazo</h2>
            <div className="col-md-12">
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
              productosPorPagina={3}
            />
            <MotivosInput
              motivos={formData.motivos}
              setMotivos={(value) => handleInputChange("motivos", value)}
              fuenteFinanciamiento={formData.fuenteFinanciamiento}
              setFuenteFinanciamiento={(value) => handleInputChange("fuenteFinanciamiento", value)}
              montoEstimado={formData.montoEstimado}
              setMontoEstimado={(value) => handleInputChange("montoEstimado", value)}
              archivos={formData.archivos}
              setArchivo= {(value) => handleInputChange("archivos", value)}
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
