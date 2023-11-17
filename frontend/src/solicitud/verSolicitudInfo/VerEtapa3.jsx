import React from "react";

const VerEtapa3 = ({ item }) => {
  return (
    <div className="contenido">
    <div className="p-5">
      <h2 className="mb-3">Fecha de envio proveedor: <span className="text-primary">{item.procesosEtapa3.fechadeenvioproveedor}</span></h2>
      <h2 className="mb-3">Estado de envio: <span className="text-primary">{item.procesosEtapa3.estadodeenvio}</span></h2>
      <h2 className="mb-3">Comentarios: <span className="text-muted">{item.procesosEtapa3.comentarios}</span></h2>
    </div>
    </div>
  );
};

export default VerEtapa3;
