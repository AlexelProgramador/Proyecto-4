import React from "react";
import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";
export const SolicitudComponent = () => {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">Solicitado por:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">En fecha:</span>
        <input type="date" className="form-control" />
        <span className="input-group-text">Anexo:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Correo Electronico:</span>
        <input type="email" className="form-control" />
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
              <input type="text" className="form-control" />
            </td>
            <td>
              <input type="text" className="form-control" />
            </td>
            <td>
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Empaque
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Empaque1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Empaque2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Empaque3
                  </a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <span>Argumente los motivos, necesidad de la compra (fundamente):</span>
      <textarea className="form-control" aria-label="With textarea"></textarea>
      <span>
        Fuente de financiamiento, indicar nombre y numero (centro de costos):
      </span>
      <textarea className="form-control" aria-label="With textarea"></textarea>
      <div className="input-group">
        <span className="input-group-text">Monto estimado de compra:</span>
        <input type="text" className="form-control" />
      </div>
      <div>
        <FaFileUpload
          style={{ fontSize: "50px", cursor: "pointer" }}
          onClick={() => console.log("pinchado")}
        />
        <input type="file" name="" id="" />
      </div>
      <ButtonComponents texto={"enviar"} />
    </>
  );
};
