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

  fetch("http://127.0.0.1:8000/api/solicitud/6540356bd31971c7e7018992", {
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
    
  <>
    <div className="input-group">
      <span className="input-group-text">Solicitado por:</span>
      <span>{solicitud.usuarioInfo.nombre} {solicitud.usuarioInfo.apellido}</span>
    </div>
    <div className="input-group">
      <span className="input-group-text">En fecha:</span>
      <span>{solicitud.created_at}</span>
      <span className="input-group-text">Anexo:</span>
      <span>{solicitud.infoSolicitud.anexo}</span>
    </div>
    <div className="input-group">
      <span className="input-group-text">Correo Electronico:</span>
      <span>{solicitud.infoSolicitud.correoElectronico}</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>
            Describa claramente el bien/servicio de la compra(fundamente)
          </th>
          <th>Cantidad</th>
          <th>Tipo Empaque</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
          <span>{solicitud.infoSolicitud.bienServicio}</span>
          </td>
          <td>
          <span>{solicitud.infoSolicitud.cantidad}</span>
          </td>
          <td>            
          <span>{solicitud.infoSolicitud.tipoEmpaque}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div className="input-group">
      <span className="input-group-text">Argumente los motivos, necesidad de la compra (fundamente):</span>
      <span>{solicitud.infoSolicitud.motivo}</span>
    </div>
    <div className="input-group">
      <span className="input-group-text">Fuente de financiamiento, indicar nombre y numero (centro de costos):</span>
      <span>{solicitud.infoSolicitud.fuenteFinanciamiento}</span>
    </div>
    <div className="input-group">
      <span className="input-group-text">Monto estimado de compra:</span>
      <span>{solicitud.infoSolicitud.montoCompra}</span>
    </div>
    <div className="input-group">
        <span className="input-group-text">Ingresar codigo costo:</span>
        <input
          type="text"
          className="form-control"
          value={codCosto}
          onChange={(e) => setCodigocosto(e.target.value)}
        />
      </div>
    <div>
      <FaFileUpload
        style={{ fontSize: "50px", cursor: "pointer" }}
        onClick={() => console.log("pinchado")}
      />Documentos Adjuntos
    </div>
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Enviar
      </button>
  </>
);
};
