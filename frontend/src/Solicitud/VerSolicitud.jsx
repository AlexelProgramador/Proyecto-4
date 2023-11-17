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
      info = <VerEtapa2 item={item} />;
      break;
    case 3:
      info = <VerEtapa3 item={item} />;
      break;
    case 4:
      info = <VerEtapa4 item={item} />;
      break;
    case 5:
      info = <VerEtapa5 item={item} />;
      break;

    default:
      info = {};
  }

  const handleButtonClick = (value) => {
    setSelected(value);
  };

  return (
    <div className="w-75 h-40 mx-auto">
      <div className="card shadow-card rounded-3 border border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between pb-0">
            <h2 class="pb-2 h1 border-bottom">Informacion de solicitud</h2>
          </div>
          <div className="h2 text-uppercase">
              <br />
              Numero de solicitud: {item.solicitudInfo.nroSolicitud}
            </div>
          <div className="botones">
            <button
              value={0}
              type="button"
              className={`botonEtapas ${selected === 0 ? "selected" : ""}`}
              onClick={() => handleButtonClick(0)}
            >
              Ver Solicitud
            </button>
            <button
              value={1}
              type="button"
              className={`botonEtapas ${selected === 1 ? "selected" : ""}`}
              onClick={() => handleButtonClick(1)}
            >
              Etapa 1
            </button>
            <button
              value={2}
              type="button"
              className={`botonEtapas ${selected === 2 ? "selected" : ""}`}
              onClick={() => handleButtonClick(2)}
            >
              Etapa 2
            </button>
            <button
              value={3}
              type="button"
              className={`botonEtapas ${selected === 3 ? "selected" : ""}`}
              onClick={() => handleButtonClick(3)}
            >
              Etapa 3
            </button>
            <button
              value={4}
              type="button"
              className={`botonEtapas ${selected === 4 ? "selected" : ""}`}
              onClick={() => handleButtonClick(4)}
            >
              Etapa 4
            </button>
            <button
              value={5}
              type="button"
              className={`botonEtapas ${selected === 5 ? "selected" : ""}`}
              onClick={() => handleButtonClick(5)}
            >
              Etapa 5
            </button>
          </div>
          {info}
        </div>
      </div>
    </div>
  );

    
};
