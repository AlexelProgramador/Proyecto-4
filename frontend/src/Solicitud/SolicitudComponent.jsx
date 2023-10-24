import React from "react";
import Modal from "react-modal";

import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";
import { useState } from "react";

Modal.setAppElement("#root");

export const SolicitudComponent = () => {
  const [anexo, setAnexo] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [bienServicio, setBienServicio] = useState("");
  const [cantidad, setCantdidad] = useState("");
  const [tipoEmpaque, setTipoEmpaque] = useState("");
  const [motivo, setMotivo] = useState("");
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState("");
  const [montoCompra, setMontoCompra] = useState("");

  const handleSubmit = (e) => {
    const data = {
      tipoSolicitud: "Solicitud Bienes/Servicos",
      infoSolicitud: {
        anexo: anexo,
        correoElectronico: correoElectronico,
        bienServicio: bienServicio,
        cantidad: cantidad,
        tipoEmpaque: tipoEmpaque,
        motivo: motivo,
        fuenteFinanciamiento: fuenteFinanciamiento,
        montoCompra: montoCompra,
      },
    };
    fetch("http://127.0.0.1:8000/api/solicitud/653711b5bc4800001b006d24", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Success:", response);
        alert("Solicitud enviada");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        <input
          type="text"
          className="form-control"
          value={anexo}
          onChange={(e) => setAnexo(e.target.value)}
        />
      </div>
      <div className="input-group">
        <span className="input-group-text">Correo Electronico:</span>
        <input
          type="email"
          className="form-control"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
        />
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
              <input
                type="text"
                className="form-control"
                value={bienServicio}
                onChange={(e) => setBienServicio(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={cantidad}
                onChange={(e) => setCantdidad(e.target.value)}
              />
            </td>
            <td>
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                value={tipoEmpaque}
                onChange={(e) => setTipoEmpaque(e.target.value)}
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
      <textarea
        className="form-control"
        aria-label="With textarea"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      ></textarea>
      <span>
        Fuente de financiamiento, indicar nombre y numero (centro de costos):
      </span>
      <textarea
        className="form-control"
        aria-label="With textarea"
        value={fuenteFinanciamiento}
        onChange={(e) => setFuenteFinanciamiento(e.target.value)}
      ></textarea>
      <div className="input-group">
        <span className="input-group-text">Monto estimado de compra:</span>
        <input
          type="text"
          className="form-control"
          value={montoCompra}
          onChange={(e) => setMontoCompra(e.target.value)}
        />
      </div>
      <div>
        <FaFileUpload style={{ fontSize: "50px", cursor: "pointer" }} />
        <input type="file" name="" id="" />
      </div>
      <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Enviar
      </button>
    </>
  );
};
