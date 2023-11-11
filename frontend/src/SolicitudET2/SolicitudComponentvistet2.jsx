
import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";
import React, { useEffect, useState } from "react";

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

  const [idEtapaEncontrado, setIdEtapa] = useState(null);


          useEffect(() => {
            // Realizar una solicitud GET para obtener los datos necesarios
            fetch("http://127.0.0.1:8000/api/etapas")
              .then((response) => response.json())
              .then((data) => {
                if (data.results && data.results.length > 0) {
                  //console.log("solicitud._id:", solicitud._id);
                  
                  // Recorremos los resultados en busca del objeto con solicitudInfo._id coincidente
                  let idEtapaEncontrado = null;
                  data.results.forEach((result) => {
                    if (result.solicitudInfo._id === solicitud._id) {
                      console.log("solicitud por fetch:", result.solicitudInfo._id);
                      
                      idEtapaEncontrado = result._id;
                    }
                  });
          
                  if (idEtapaEncontrado) {
                    console.log("idetapa encontrado adentr0:", idEtapaEncontrado);
                    setIdEtapa(idEtapaEncontrado);
                  } else {
                    console.error("No se encontró un objeto con solicitudInfo._id coincidente.");
                  }
                } else {
                  console.error("No se encontraron datos de etapas.");
                }
              })
              .catch((error) => {
                console.error("Error al obtener los datos de etapas:", error);
              });
          }, []);
          console.log("idetapaEncontrado fuera del useEffect:", idEtapaEncontrado);

  const confirmarRevision = (solicitud) => {
 

    fetch(`http://127.0.0.1:8000/api/etapa/6540356bd31971c7e7018992/${idEtapaEncontrado}`, {
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
  
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Solicitud Etapa 2</h2>

      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text">Solicitado por:</span>
            <span className="form-control">{solicitud.usuarioInfo.nombre} {solicitud.usuarioInfo.apellido}</span>
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
            <FaFileUpload
              style={{ fontSize: "50px", cursor: "pointer", marginRight: "10px" }}
              onClick={() => console.log("pinchado")}
            />
            Documentos Adjuntos
          </div>
          <button
            className="btn btn-primary"
            onClick={confirmarRevision}
            disabled={!idEtapaEncontrado}
          >
            Confirmar Revisión de la Solicitud
          </button>
        </div>
      </div>
    </div>
  );
};
