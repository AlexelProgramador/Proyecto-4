import React from "react";
import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";
import { useState } from "react";


export const SolicitudComponentET3 = ({ solicitud }) => {
console.log("Número de Solicitud:", solicitud);

console.log("Número de Solicitud:", solicitud.nroSolicitud);

const [codCosto, setCodigocosto] = useState("");

const handleSubmit = (e) => {
  const data = { 
    infoSolicitud: {
      codigoCosto: codCosto
    }
  };

  fetch(`http://127.0.0.1:8000/api/solicitud/6540356bd31971c7e7018992`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
.then((response) => {
  if (response.ok) {
    console.log("Solicitud de confirmación exitosa.");
    // Puedes actualizar tu estado local si es necesario
    // setEtapas([...]);
  } else {
    console.error("Error en la solicitud de confirmación.");
  }
})
.catch((error) => {
  console.error("Error al confirmar la revisión:", error);
});
};
return (
  <div className="container mt-4">
    <h2 className="text-center mb-4">Solicitud Etapa 3</h2>

    <div className="row">
      <div className="col-md-6">
        <div className="input-group mb-3">
          <span className="input-group-text">Solicitado por:</span>
          <span className="form-control">
            {solicitud.usuarioInfo.nombre} {solicitud.usuarioInfo.apellido}
          </span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">En fecha:</span>
          <span className="form-control">{solicitud.created_at}</span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Anexo:</span>
          <span className="form-control">{solicitud.infoSolicitud.anexo}</span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Correo Electrónico:</span>
          <span className="form-control">{solicitud.infoSolicitud.correoElectronico}</span>
        </div>
      </div>

      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Tipo de Empaque</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{solicitud.infoSolicitud.bienServicio}</td>
              <td>{solicitud.infoSolicitud.cantidad}</td>
              <td>{solicitud.infoSolicitud.tipoEmpaque}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <div className="input-group mb-3">
          <span className="input-group-text">Motivos de la Compra:</span>
          <span className="form-control">{solicitud.infoSolicitud.motivo}</span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Fuente de Financiamiento:</span>
          <span className="form-control">{solicitud.infoSolicitud.fuenteFinanciamiento}</span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Monto Estimado de Compra:</span>
          <span className="form-control">{solicitud.infoSolicitud.montoCompra}</span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Ingresar código costo:</span>
          <input
            type="text"
            className="form-control"
            value={codCosto}
            onChange={(e) => setCodigocosto(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <FaFileUpload
            style={{ fontSize: "50px", cursor: "pointer", marginRight: "10px" }}
            onClick={() => console.log("pinchado")}
          />
          Documentos Adjuntos
        </div>
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  </div>
);
};
