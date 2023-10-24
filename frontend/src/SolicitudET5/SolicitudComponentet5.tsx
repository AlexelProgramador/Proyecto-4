import React from "react";
import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";
export const SolicitudComponentET5 = () => {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">Tipo de compra:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Nro Cotizacion:</span>
        <input type="text" className="form-control" />
        <span className="input-group-text">Estado:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
      <span className="input-group-text">Comentario:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">N° Orden de compra:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Fecha de OC:</span>
        <input type="date" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Proveedor Seleccionado:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
      <span className="input-group-text">Fecha de entrega proveedor:</span>
      <input type="date" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Valor de compra + IVA:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
      <span className="input-group-text">Fecha autorizacion de compra:</span>
      <input type="date" className="form-control" />
      </div>
      <div>
        <FaFileUpload
          style={{ fontSize: "50px", cursor: "pointer" }}
          onClick={() => console.log("pinchado")}
        />
        <input type="file" name="" id="" />
      </div>
      <ButtonComponents texto={"enviar"} />
    </>
  );
};
