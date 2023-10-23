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
    <div className="sidebar">
      <div className="iconos">
        <BiHomeAlt2 />
        <div className="icono-crear" onClick={handleOpen}>
          <AiFillFileAdd />
          <p>crear solicitud</p>
        </div>
      </div>
      <Modal isOpen={isOpen} onRequestClose={handleOpen}>
        <SolicitudComponent />
      </Modal>
    </div>
  );
};
