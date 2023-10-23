import React from "react";

export const ButtonComponents = ({ texto, color = "primary" }) => {
  return <button className={`botonRol btn btn-${color}`}>{texto}</button>;
};
