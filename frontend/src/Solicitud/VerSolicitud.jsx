import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./VerSolicitud.css";
import InfoSolicitud from "./InfoSolicitud";

export const VerSolicitud = () => {
  const location = useLocation();
  const item = location.state.item;
  const [selected, setSelected] = useState(0);

  const handleButtonClick = (value) => {
    setSelected(value);
  };

  return (
    <div className="w-75 h-40 mx-auto">
      <div className="card shadow-card rounded-3 border border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between pb-0">
            <div className="h1 text-uppercase">
              Solicitud nro: {item.solicitudInfo.nroSolicitud}
            </div>
          </div>
          <div className="botones">
            <button
              value={0}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 0 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(0)}
            >
              Ver Solicitud
            </button>
            <button
              value={1}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 1 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(1)}
            >
              Etapa 1
            </button>
            <button
              value={2}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 2 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(2)}
            >
              Etapa 2
            </button>
            <button
              value={3}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 3 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(3)}
            >
              Etapa 3
            </button>
            <button
              value={4}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 4 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(4)}
            >
              Etapa 4
            </button>
            <button
              value={5}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 5 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(5)}
            >
              Etapa 5
            </button>
            <button
              value={6}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 6 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(6)}
            >
              Etapa 6
            </button>
            <button
              value={7}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 7 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(7)}
            >
              Etapa 7
            </button>
            <button
              value={8}
              type="button"
              className={`btn btn-lg botonEtapas ${
                selected === 8 ? "selected" : ""
              }`}
              onClick={() => handleButtonClick(8)}
            >
              Etapa 8
            </button>
          </div>
          <InfoSolicitud selected={selected} item={item} />
        </div>
      </div>
    </div>
  );
};
