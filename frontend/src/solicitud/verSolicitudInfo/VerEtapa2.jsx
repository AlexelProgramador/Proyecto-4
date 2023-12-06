import React from "react";

const verEtapa2 = ({ item }) => {
  return (
    <div className="contenido">
    <div className="p-5">
      <h2 className="mb-3">Tipo de compra: <span className="text-primary">{item.procesosEtapa2.tipodecompra}</span></h2>
      <h2 className="mb-3">Numero de cotizaciones: <span className="text-primary">{item.procesosEtapa2.numerocotizacion}</span></h2>
      <h2 className="mb-3">Estado: <span className="text-primary">{item.procesosEtapa2.estado}</span></h2>
      <h2 className="mb-3">Comentario: <span className="text-muted">{item.procesosEtapa2.comentarios}</span></h2>
      <h2 className="mb-3">Numero de orden de compra: <span className="text-primary">{item.procesosEtapa2.nroordendecompra}</span></h2>
      <h2 className="mb-3">Fecha de orden de compra: <span className="text-primary">{item.procesosEtapa2.fechadeoc}</span></h2>
      <h2 className="mb-3">Proveedor seleccinado: <span className="text-primary">{item.procesosEtapa2.proveedorseleccionado}</span></h2>
      <h2 className="mb-3">Fecha entrega de proveedor: <span className="text-primary">{item.procesosEtapa2.fechaentregaproveedor}</span></h2>
      <h2 className="mb-3">Compra + IVA: <span className="text-primary">$ {item.procesosEtapa2.valordecompramiva}</span></h2>
      <h2 className="mb-3">Fecha de autocompraS: <span className="text-primary">{item.procesosEtapa2.fechaautocompra}</span></h2>
    </div>
    </div>
  );
};

export default verEtapa2;
