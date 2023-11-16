import React from "react";

const verEtapa1 = ({ item }) => {
  return (
    <div className="contenido">
      <h2>Centro de Costos: {item.procesosEtapa1.centroDeCostos}</h2>
      <h2>
        Verificar Saldo:{" "}
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={item.procesosEtapa1.verificarSaldo === "1"}
            disabled
          />
          <span className="slider"></span>
        </label>
      </h2>
      <h2>Comentario: {item.procesosEtapa1.comentario}</h2>
    </div>
  );
};

export default verEtapa1;
