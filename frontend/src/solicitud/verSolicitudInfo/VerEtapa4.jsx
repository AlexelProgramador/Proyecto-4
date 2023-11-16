import React from "react";

const VerEtapa4 = ({ item }) => {
  return (
    <div className="contenido">
      <h2>Fecha estimada de compra: {item.procesosEtapa4.fechaestiprov}</h2>
      <h2>Estado de compra: {item.procesosEtapa4.estadodecomp}</h2>
      <h2>Comentario: {item.procesosEtapa4.comentarios}</h2>
    </div>
  );
};

export default VerEtapa4;
