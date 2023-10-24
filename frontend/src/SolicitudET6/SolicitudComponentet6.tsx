import React from "react";
import { ButtonComponents } from "../Components/ButtonComponents";
import { FaFileUpload } from "react-icons/fa";
export const SolicitudComponentET6 = () => {
  return (
    <>
      <div className="input-group">
        <span className="input-group-text">Fecha de envio a proveedor:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
      <span className="input-group-text">Estado de envio:</span>
        <input type="text" className="form-control" />
      </div>
      <div className="input-group">
        <span className="input-group-text">Comentario:</span>
        <input type="text" className="form-control" />
      </div>
      <div>
        <FaFileUpload
          style={{ fontSize: "50px", cursor: "pointer" }}
          onClick={() => console.log("pinchado")}
        />
        <input type="file" name="" id="" />
      </div>
      <ButtonComponents texto={"Realizar actualizacion de estado"} />
    </>
  );
};
