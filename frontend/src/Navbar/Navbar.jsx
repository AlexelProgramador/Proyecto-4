import React from "react";
import { BiBell } from "react-icons/bi";

export const Navbar = () => {
  return (
    <>
      <div className="navbar-brand text-dark">
        <h1>Solicitudes</h1>
      </div>
      <div className="usuario">
        <BiBell className="logo"/>
        <p>Usuario</p>
      </div>
    </>
  );
};
