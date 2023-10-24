import React from "react";
import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";
export const SolicitudComponentET4 = () => {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">Solicitado por:</span>

      </div>
      <div className="input-group">
        <span className="input-group-text">En fecha:</span>

        <span className="input-group-text">Anexo:</span>

      </div>
      <div className="input-group">
        <span className="input-group-text">Correo Electronico:</span>
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
            Contenido
            </td>
            <td>Contenido 
            </td>
          </tr>
        </tbody>
      </table>
      <span>Argumente los motivos, necesidad de la compra (fundamente):</span>
      <span>
        Fuente de financiamiento, indicar nombre y numero (centro de costos):
      </span>
      <div className="input-group">
        <span className="input-group-text">Monto estimado de compra:</span>
      </div>
      <div className="input-group">
        <span className="input-group-text">Ingresar codigo costo:</span>
      </div>
      <div>
        <FaFileUpload
          style={{ fontSize: "50px", cursor: "pointer" }}
          onClick={() => console.log("pinchado")}
        />Documentos Adjuntos
      </div>
      <ButtonComponents texto={"Confirmar revision solicitud"} />
    </>
  );
};
