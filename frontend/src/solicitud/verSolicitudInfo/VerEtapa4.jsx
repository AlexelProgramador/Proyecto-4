import React from "react";

const VerEtapa4 = ({ item }) => {
  return (
    <div className="contenido">
    <div className="p-5">
      <h2 className="mb-3">Fecha estimada de compra: <span className="text-primary">{item.procesosEtapa4.fechaestiprov}</span></h2>
      <h2 className="mb-3">Estado de compra: <span className="text-primary">{item.procesosEtapa4.estadodecomp}</span></h2>
      <h2 className="mb-3">Comentario: <span className="text-muted">{item.procesosEtapa4.comentarios}</span></h2>
    </div>
    </div>
  );
};

export default VerEtapa4;
