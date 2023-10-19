import React from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { BiHomeAlt2 } from "react-icons/bi";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="iconos">
        <BiHomeAlt2 />
        <div className="icono-crear">
          <AiFillFileAdd />
          <p>crear solicitud</p>
        </div>
      </div>
    </div>
  );
};
