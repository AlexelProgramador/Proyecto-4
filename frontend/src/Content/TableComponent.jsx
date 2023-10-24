import React, { useState } from "react";
import { headTitleTableSolicitud } from "./constants";
import { ProgressBarComponents } from "../Components/ProgressBarComponents";
import Modal from "react-modal";
import { SolicitudComponentET2 } from "../SolicitudET2/SolicitudComponentvistet2";
import { SolicitudComponentET3 } from "../SolicitudET3/SolicitudComponentvistaet3";
import { SolicitudComponentET4 } from "../SolicitudET4/SolicitudComponentvistaet4";
import { SolicitudComponentET5 } from "../SolicitudET5/SolicitudComponentet5";
import { SolicitudComponentET6 } from "../SolicitudET6/SolicitudComponentet6";
import { SolicitudComponentET7 } from "../SolicitudET7/SolicitudComponentet7";
import { SolicitudComponentET8 } from "../SolicitudET8/SolicitudComponentet8";

export const TableComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleOpen = (component) => {
    setSelectedComponent(component);
    setIsOpen(true);
  };

  const handleClose = () => {
    setSelectedComponent(null);
    setIsOpen(false);
  };
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
            <td onClick={handleOpen} style={{ cursor: "pointer" }}>
              Accion
            </td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents textBar={"Tu turno"} />
            </td>
            <td>1</td>
            <td onClick={handleOpen} style={{ cursor: "pointer" }}>
              Accion
            </td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"success"}
                textBar={"Completo"}
              />
            </td>
            <td >4</td>
            <td onClick={() => handleOpen(<SolicitudComponentET2 />)}
              style={{ cursor: "pointer" }}>
              boton etapa 2
            </td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"danger"}
                textBar={"Rechazado"}
              />
            </td>
            <td >4</td>
            <td onClick={() => handleOpen(<SolicitudComponentET3 />)}
              style={{ cursor: "pointer" }} >Boton etapa 3</td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"success"}
                textBar={"Completo"}
              />
            </td>
            <td >4</td>
            <td onClick={() => handleOpen(<SolicitudComponentET4 />)} style={{ cursor: "pointer" }}> boton etapa 4 </td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"danger"}
                textBar={"Rechazado"}
              />
            </td>
            <td >4</td>
            <td onClick={() => handleOpen(<SolicitudComponentET5 />)} style={{ cursor: "pointer" }} >Boton etapa 5</td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"danger"}
                textBar={"Rechazado"}
              />
            </td>
            <td >4</td>
            <td onClick={() => handleOpen(<SolicitudComponentET6 />)} style={{ cursor: "pointer" }} >Boton etapa 6</td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"danger"}
                textBar={"Rechazado"}
              />
            </td>
            <td >4</td>
            <td onClick={() => handleOpen(<SolicitudComponentET7 />)} style={{ cursor: "pointer" }} >Boton etapa 7</td>
          </tr>
          <tr>
            <td>1234</td>
            <td>
              <ProgressBarComponents
                colorBar={"danger"}
                textBar={"Rechazado"}
              />
            </td>
            <td >4</td>
            <td onClick={() => handleOpen(<SolicitudComponentET8 />)} style={{ cursor: "pointer" }} >Boton etapa 8</td>
          </tr>
        </tbody>
      </table>
      <Modal isOpen={isOpen} onRequestClose={handleClose} shouldCloseOnOverlayClick={true}>
      {selectedComponent}
      </Modal>
    </>
  );
};