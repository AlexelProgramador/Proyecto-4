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

    fetch("http://127.0.0.1:8000/api/solicitud/6540356bd31971c7e7018992", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Número de Solicitud:", response.result.nroSolicitud);

        // Construye los datos para el segundo fetch
        const etapaData = {
          nroEtapa: 1,
          completado: null,
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
                esPrivado: 1,
              },
              comentarioId2: {
                comentario: "comentario 2 no es un comentario privado",
                fecha: "HH:MM:SS - D/M/Y",
                esPrivado: 0,
              },
            },
          },
          procesosEtapa2: [],
          procesosEtapa3: [],
          procesosEtapa4: [],
          procesosEtapa5: [],
          procesosEtapa6: [],
          procesosEtapa7: [],
          procesosEtapa8: [],
          usuarioEtapa: {
            _id: "6540356bd31971c7e7018992",
            nombre: "Diego",
            apellido: "Baltazar"
          },
          solicitudInfo: {
            _id: response.result.id,
            nroSolicitud: response.result.nroSolicitud,
            usuarioInfo: {
              _id: "6540356bd31971c7e7018992",
              nombre: "Diego",
              apellido: "Baltazar"
            },
          },
          updated_at: "2023-10-30T23:32:56.896000Z",
          created_at: "2023-10-30T23:32:56.896000Z",
        };

        fetch(
          `http://127.0.0.1:8000/api/etapa/6540356bd31971c7e7018992/${response.result.nroSolicitud}`,
          {
            method: "POST", // Cambia a POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(etapaData), // Envía los datos en el cuerpo de la solicitud
          }
        )
          .then((etapaResponse) => etapaResponse.json())
          .then((etapaResponseData) => {
            console.log("Datos de etapa:", etapaResponseData);
            alert("Solicitud enviada");
          })
          .catch((etapaError) => {
            console.error("Error al obtener datos de etapa:", etapaError);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return  (
    <div className="container mt-4">
            <h2 className="text-center mb-4">Crear Solicitud Etapa 1</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="solicitadoPor" className="form-label">
              Solicitado por:
            </label>
            <input type="text" className="form-control" id="solicitadoPor" />
          </div>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">
              En fecha:
            </label>
            <input type="date" className="form-control" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="anexo" className="form-label">
              Anexo:
            </label>
            <input
              type="text"
              className="form-control"
              value={anexo}
              onChange={(e) => setAnexo(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="correoElectronico" className="form-label">
          Correo Electrónico:
        </label>
        <input
          type="email"
          className="form-control"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
        />
      </div>

      <table className="table">
  <thead>
    <tr>
      <th>Describa claramente el bien/servicio de la compra (fundamente)</th>
      <th>Cantidad</th>
      <th>Tipo Empaque</th>
      <th></th> {/* Espacio para el botón de agregar */}
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
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="tipoEmpaqueDropdown"
            data-bs-toggle="dropdown"
          >
            {tipoEmpaque || "Tipo de Empaque"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="tipoEmpaqueDropdown">
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
        </div>
      </td>
      <td>
        <button className="btn btn-primary">Agregar</button>
      </td>
    </tr>
  </tbody>
</table>
      <div className="mb-3">
        <label htmlFor="motivo" className="form-label">
          Argumente los motivos, necesidad de la compra (fundamente):
        </label>
        <textarea
          className="form-control"
          aria-label="With textarea"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="fuenteFinanciamiento" className="form-label">
          Fuente de financiamiento, indicar nombre y número (centro de costos):
        </label>
        <textarea
          className="form-control"
          aria-label="With textarea"
          value={fuenteFinanciamiento}
          onChange={(e) => setFuenteFinanciamiento(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="montoCompra" className="form-label">
          Monto estimado de compra:
        </label>
        <input
          type="text"
          className="form-control"
          value={montoCompra}
          onChange={(e) => setMontoCompra(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="adjunto" className="form-label">
          Adjuntar archivo:
        </label>
        <div className="d-flex align-items-center">
          <FaFileUpload style={{ fontSize: "30px", marginRight: "10px", cursor: "pointer" }} />
          <input type="file" name="" id="" />
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
};
