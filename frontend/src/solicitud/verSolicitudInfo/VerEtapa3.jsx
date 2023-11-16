import React from "react";

const VerEtapa3 = ({ item }) => {
  return (
    <div className="contenido">
      <h2>
        Fecha de envio proveedor: {item.procesosEtapa3.fechadeenvioproveedor}
      </h2>
      <h2>Estado de envio: {item.procesosEtapa3.estadodeenvio}</h2>
      <h2>Comentarios: {item.procesosEtapa3.comentarios}</h2>
    </div>
  );
};

export default VerEtapa3;
