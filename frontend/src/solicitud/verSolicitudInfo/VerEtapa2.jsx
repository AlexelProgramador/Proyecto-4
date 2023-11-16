import React from "react";

const verEtapa2 = ({ item }) => {
  return (
    <div className="contenido">
      <h2>Tipo de compra: {item.procesosEtapa2.tipodecompra}</h2>
      <h2>Numero de cotizaciones: {item.procesosEtapa2.numerodecotizacion}</h2>
      <h2>Estado: {item.procesosEtapa2.estado}</h2>
      <h2>Comentario: {item.procesosEtapa2.comentarios}</h2>
      <h2>Numero de orden de compra: {item.procesosEtapa2.nroordendecompra}</h2>
      <h2>Fecha de orden de compra: {item.procesosEtapa2.fechadeoc}</h2>
      <h2>
        Proveedor seleccinado: {item.procesosEtapa2.proveedorseleccionado}
      </h2>
      <h2>
        Fecha entrega de proveedor: {item.procesosEtapa2.fechaentregaproveedor}
      </h2>
      <h2>Compra + IVA: {item.procesosEtapa2.valordecompraiva}</h2>
      <h2>Fecha de autocompraS: {item.procesosEtapa2.fechaautocompra}</h2>
    </div>
  );
};

export default verEtapa2;
