import React, { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { BiHomeAlt2 } from "react-icons/bi";
import Modal from "react-modal";
import { SolicitudComponent } from "../Solicitud/SolicitudComponent";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar text-white d-flex flex-column justify-content-center p-4">
      <BiHomeAlt2 className="icono-home fs-3 mb-3" style={{ marginTop: "-15px" }} />
      <div className="icono-crear text-center" onClick={handleOpen}>
        <AiFillFileAdd className="fs-3" />
        <p className="m-0">Crear Solicitud</p>
      </div>
      <Modal isOpen={isOpen} onRequestClose={handleOpen}>
        <SolicitudComponent />
      </Modal>
    </div>
  );
};
