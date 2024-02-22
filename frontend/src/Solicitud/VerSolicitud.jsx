import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./VerSolicitud.css";
import {
  InfoSolicitud,
  VerEtapa1,
  VerEtapa2,
  VerEtapa3,

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

    default:
      info = {};
  }

  const handleButtonClick = (value) => {
    setSelected(value);
  };

  return (
    <div className="w-75 h-40 mx-auto">
      <div className="mb-3">
        <h2 className="mx-auto display-4">Información de solicitud</h2>
        <p className="display-7">
            Aquí puedes visualizar información específica de una solicitud.
          </p>
        <div className="card shadow-card rounded-3 border border-0">
          <div className="card-body">
            <div className="d-flex justify-content-between pb-0">
            </div>
            <h5 className="h5 text-uppercase pb-2">
              Numero de solicitud: {item.infoSolicitud.nroSolicitud}
            </h5>

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
            </div>
            {info}
          </div>
        </div>
      </div>
    </div>
  );
};
