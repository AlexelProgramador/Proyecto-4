import React from "react";

const verEtapa1 = ({ item }) => {
  return (
    <div className="contenido">
    <div className="p-5">
      <h2 className="mb-3">Centro de Costos: <span className="text-primary">{item.procesosEtapa1.centroDeCostos}</span></h2>
      <h2 className="mb-3">
        Verificar Saldo:{" "}
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={item.procesosEtapa1.verificarSaldo === "1"}
            disabled
            className="ml-2"
          />
          <span className="slider"></span>
        </label>
      </h2>
      <h2>Comentario: <span className="text-muted">{item.procesosEtapa1.comentario}</span></h2>
    </div>
    </div>
  );
};

export default verEtapa1;


