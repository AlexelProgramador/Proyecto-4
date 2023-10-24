import React from "react";
import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";
export const SolicitudComponentET8 = () => {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">N° CDP:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
      <span className="input-group-text">Estado:</span>
        <input type="text" className="form-control" />
      <span className="input-group-text">Proveedor:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">N° de factura:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
      <span className="input-group-text">Fecha de emision factura:</span>
      <input type="date" className="form-control" />
      <span className="input-group-text">Fecha maxima:</span>
      <input type="date" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Aceptada SII:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
      <span className="input-group-text">Fecha vencimiento factura:</span>
      <input type="date" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Monto de factura:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Comentario:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
      <span className="input-group-text">Fecha de recepcion:</span>
      <input type="date" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Persona a cargo de la recepcion:</span>
        <input type="text" className="form-control" />
      </div>
      <div>
        <FaFileUpload
          style={{ fontSize: "50px", cursor: "pointer" }}
          onClick={() => console.log("pinchado")}
        />
        <input type="file" name="" id="" />
      </div>
      <ButtonComponents texto={"Confirmar recepcion"} />
    </>
  );
};
