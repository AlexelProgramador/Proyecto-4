import React from "react";
import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";

export const SolicitudComponentET2 = ({ solicitud }) => {

  const data = {
    nroEtapa: 2, // Nuevo valor de nroEtapa
    completado: 0,
    procesosEtapa1: {
      estado: "en Proceso",
      proceso1Etapa1: "proceso1Etapa1",
      proceso2Etapa1: "proceso2Etapa1",
      proceso3Etapa1: "proceso3Etapa1",
      proceso4Etapa1: "proceso4Etapa1",
      comentarios: {
        comentarioId1: {
          comentario: "comentario 1 es un comentario privado",
          fecha: "HH:MM:SS - D/M/Y",
          esPrivado: 1
        },
        comentarioId2: {
          comentario: "comentario 2 no es un comentario privado",
          fecha: "HH:MM:SS - D/M/Y",
          esPrivado: 0
        }
      }
    },
    procesosEtapa2: {},
    procesosEtapa3: {},
    procesosEtapa4: {},
    procesosEtapa5: {},
    procesosEtapa6: {},
    procesosEtapa7: {},
    procesosEtapa8: {}
  };
  const confirmarRevision = (solicitud) => {


    fetch(`http://127.0.0.1:8000/api/etapa/6540356bd31971c7e7018992/${solicitud._id}`, {
      method: "PUT", // Utiliza el método PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convierte los datos a JSON
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
  
  console.log("id de etapa:", solicitud._id);
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
      <div>
        <FaFileUpload
          style={{ fontSize: "50px", cursor: "pointer" }}
          onClick={() => console.log("pinchado")}
        />Documentos Adjuntos
      </div>
      <button
  onClick={() => confirmarRevision(solicitud)}
  
>
  Confirmar revisión de la solicitud
</button>
    </>
  );
};
