import React from "react";

const VerEtapa5 = ({ item }) => {
  return (
    <div className="contenido">
    <div className="p-5">
      <h2 className="mb-3">Numero cdp: <span className="text-primary">{item.procesosEtapa5.ncdp}</span></h2>
      <h2 className="mb-3">Estado: <span className="text-primary">{item.procesosEtapa5.estado}</span></h2>
      <h2 className="mb-3">Proveedor: <span className="text-primary">{item.procesosEtapa5.proveedor}</span></h2>
      <h2 className="mb-3">Fecha emision de factura: <span className="text-primary">{item.procesosEtapa5.fechaemisionfact}</span></h2>
      <h2 className="mb-3">Fecha maxima: <span className="text-primary">{item.procesosEtapa5.fechamaxima}</span></h2>
      <h2 className="mb-3">Aceptado SSI: <span className="text-primary">{item.procesosEtapa5.aceptadoSsi}</span></h2>
      <h2 className="mb-3">Fecha vencimiento de factura: <span className="text-primary">{item.procesosEtapa5.fechavencfact}</span></h2>
      <h2 className="mb-3">Monto de factura: <span className="text-primary">{item.procesosEtapa5.montofactura}</span></h2>
    </div>
    </div>
  );
};

export default VerEtapa5;
