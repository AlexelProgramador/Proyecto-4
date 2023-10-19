import React from "react";

export const ButtonComponents = ({ texto, color }) => {
  return (
    <button
      className={`botonRol ${color ? `btn btn-${color}` : "btn btn-secondary"}`}
    >
      {texto}
    </button>
  );
};
