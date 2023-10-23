import React from "react";
import { ButtonComponents } from "../Components/ButtonComponents";
import { roles } from "./constants";
import { TableComponent } from "./TableComponent";
export const Content = () => {
  return (
    <>
      <h4>Seleccione su rol:</h4>
      <div className="roles">
        {roles.map((rol, index) => {
          return <ButtonComponents key={index} texto={rol} color={"primary"} />;
        })}
      </div>
      <h3>Detalles de solicitudes</h3>
      <p>Ver y gestionar las solicitudes recientes</p>
      <div style={{display: "flex"}}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar solicitud (por N° de solicitud, estado o etapa)"
        />
        <ButtonComponents texto={"Buscar"} color={"success"}/>
      </div>
      <TableComponent />
    </>
  );
};
