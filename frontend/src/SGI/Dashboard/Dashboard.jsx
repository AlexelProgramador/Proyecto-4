import React, { useState, useEffect } from 'react';
import DashboardBodega from '../Almacenamiento/Bodega/DashboardBodega';
import DashboardBotiquin from '../Almacenamiento/Botiquin/DashboardBotiquin';

export const DashboardHome = () => {
  const response = JSON.parse(localStorage.getItem("response"));
  const roles = response.usuario;
  console.log(roles);
  const isAdminOrBodeguero = response && response.usuario && (
    response.usuario.includes("Administrador") || response.usuario.includes("Bodeguero")
  );
  console.log(isAdminOrBodeguero);
  const isBotiquinero = response && response.usuario && response.usuario.includes("Botiquinero");
  return (
      <div>
        {isAdminOrBodeguero && (
          <div>
            <DashboardBodega/>
          </div>
        )}
        {!isAdminOrBodeguero && isBotiquinero && (
          <div>
            <DashboardBotiquin/>
          </div>
        )}
      </div>
    
  );
};
export default DashboardHome;
