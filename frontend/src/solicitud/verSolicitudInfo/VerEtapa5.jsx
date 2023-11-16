import React from "react";

const VerEtapa5 = ({ item }) => {
  return (
    <div className="contenido">
      <h2>Numero cdp: {item.procesosEtapa5.ncdp}</h2>
      <h2>Estado: {item.procesosEtapa5.estado}</h2>
      <h2>Proveedor: {item.procesosEtapa5.proveedor}</h2>
      <h2>Fecha emision de factura: {item.procesosEtapa5.fechaemisionfact}</h2>
      <h2>Fecha maxima: {item.procesosEtapa5.fechamaxima}</h2>
      <h2>Aceptado SSI: {item.procesosEtapa5.aceptadoSsi}</h2>
      <h2>Fecha vencimiento de factura: {item.procesosEtapa5.fechavencfact}</h2>
      <h2>Monto de factura: {item.procesosEtapa5.montofactura}</h2>
    </div>
  );
};

export default VerEtapa5;
