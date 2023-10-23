import React from "react";
import { headTitleTableSolicitud } from "./constants";
import { ProgressBarComponents } from "../Components/ProgressBarComponents";
export const TableComponent = () => {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            {headTitleTableSolicitud.map((title, index) => {
              return <th key={index}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"warning"}
                textBar={"En espera"}
              />
            </td>
            <td>2</td>
            <td>Accion</td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents textBar={"Tu turno"} />
            </td>
            <td>1</td>
            <td>Accion</td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"success"}
                textBar={"Completo"}
              />
            </td>
            <td>4</td>
            <td>Accion</td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"danger"}
                textBar={"Rechazado"}
              />
            </td>
            <td>4</td>
            <td>Accion</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
