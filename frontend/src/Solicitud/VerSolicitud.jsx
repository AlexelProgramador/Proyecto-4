import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./VerSolicitud.css";
import {
  InfoSolicitud,
  VerEtapa1,
  VerEtapa2,
  VerEtapa3,
  VerEtapa4,
  VerEtapa5,
  VerEtapa5Classic,
  VerEtapa2Classic,
} from "./verSolicitudInfo/";

export const VerSolicitud = () => {
  const location = useLocation();
  const item = location.state.item;
  const [selected, setSelected] = useState(0);

  let info;
  switch (selected) {
    case 0:
      info = <InfoSolicitud item={item} />;
      break;
    case 1:
      info = <VerEtapa1 item={item} />;
      break;
      case 2:
        if (item.procesosEtapa2.formularios !== undefined) {
            console.log("entre a etapa2nuevo");

            // Lógica para procesar el primer tipo de datos
            info = <VerEtapa2 item={item} />;
        } else if (item.procesosEtapa2.estado !== undefined && item.procesosEtapa2.fechaautocompra !== undefined && item.procesosEtapa2.fechadeoc !== undefined) {
          console.log("entre a etapa2viejo");  
          // Lógica para procesar el segundo tipo de datos
            info = <VerEtapa2Classic item={item} />;
        } else if (item.procesosEtapa2.estado == undefined) {
          info = 
          (
            <div className="contenido">
              <div className="p-4">
                <div>Solicitud en proceso. La información estará disponible aquí una vez que se complete esta etapa.</div>
              </div>
            </div>
          );
        }
        break;
    case 3:
        if (Array.isArray(item.procesosEtapa3) && item.procesosEtapa3.length > 0) {
          // Si procesosEtapa3 es un array con elementos, mostramos VerEtapa4
          console.log("entre a etapa3");
          info = <VerEtapa3 item={item} />;
        } else if (typeof item.procesosEtapa3 === 'object' && Object.keys(item.procesosEtapa3).length > 0) {
          // Si procesosEtapa3 es un objeto con propiedades, mostramos VerEtapa3
          console.log("entre a etapa4");
      
          info = <VerEtapa4 item={item} />;
        } else {
          console.log("error lol");
        }
    break;
    case 4:
      // Si tiene procesos de etapa 4, mostramos VerEtapa4
      // de lo contrario, mostramos VerEtapa5
      info = item.procesosEtapa4 ? <VerEtapa5 item={item} /> : <VerEtapa5 item={item} />;
      break;
    case 5:
      info = item.procesosEtapa5 ? <VerEtapa5Classic item={item} /> : <VerEtapa3 item={item} />;
      break;
    default:
      info = {};
  }

  const handleButtonClick = (value) => {
    setSelected(value);
  };

  // Verificamos si el objeto tiene la propiedad procesosEtapa4
  const hasProcesosEtapa4 = item.procesosEtapa4 !== undefined;

  return (
    <div className="w-75 h-40 mx-auto">
      <div className="mb-3">
        <h2 className="mx-auto display-4">Información de solicitud</h2>
        <p className="display-7">
          Aquí puedes visualizar información específica de una solicitud.
        </p>
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-0"></div>
            <h5 className="h5 text-uppercase pb-2">
              Numero de solicitud: {item.infoSolicitud.nroSolicitud}
            </h5>

            <div className="botones">
              <button
                value={0}
                type="button"
                className={`botonEtapas ${
                  selected === 0 ? "selected" : ""
                }`}
                onClick={() => handleButtonClick(0)}
              >
                Ver Solicitud
              </button>
              <button
                value={1}
                type="button"
                className={`botonEtapas ${
                  selected === 1 ? "selected" : ""
                }`}
                onClick={() => handleButtonClick(1)}
              >
                Etapa 1
              </button>
              <button
                value={2}
                type="button"
                className={`botonEtapas ${
                  selected === 2 ? "selected" : ""
                }`}
                onClick={() => handleButtonClick(2)}
              >
                Etapa 2
              </button>
              <button
                value={3}
                type="button"
                className={`botonEtapas ${
                  selected === 3 ? "selected" : ""
                }`}
                onClick={() => handleButtonClick(3)}
              >
                Etapa 3
              </button>
              {/* Renderizamos botones para etapas 4 y 5 si están disponibles */}
              {hasProcesosEtapa4 && (
                <>
                  <button
                    value={4}
                    type="button"
                    className={`botonEtapas ${
                      selected === 4 ? "selected" : ""
                    }`}
                    onClick={() => handleButtonClick(4)}
                  >
                    Etapa 4
                  </button>
                  <button
                    value={5}
                    type="button"
                    className={`botonEtapas ${
                      selected === 5 ? "selected" : ""
                    }`}
                    onClick={() => handleButtonClick(5)}
                  >
                    Etapa 5
                  </button>
                </>
              )}
            </div>
            {info}
          </div>
        </div>
      </div>
    </div>
  );
};