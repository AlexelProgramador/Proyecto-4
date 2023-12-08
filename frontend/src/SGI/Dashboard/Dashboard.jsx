import React, { useState, useEffect } from 'react';
import DashboardBodega from '../Almacenamiento/Bodega/DashboardBodega';
import DashboardBotiquin from '../Almacenamiento/Botiquin/DashboardBotiquin';
import DashboardAdministrador from '../Administrador/DashboardAdministrador';

export const DashboardHome = () => {
  const response = JSON.parse(localStorage.getItem("response"));
  const isAdmin = response && response.usuario && response.usuario.includes("Administrador") ;
  const isBodeguero = response && response.usuario && response.usuario.includes("Bodeguero");
  const isBotiquinero = response && response.usuario && response.usuario.includes("Botiquinero");
  return (
      <div>
        {isAdmin && (
          <div>
            <DashboardAdministrador/>
          </div>
        )}
        {isBodeguero && (
          <div>
            <DashboardBodega/>
          </div>
        )}
        {isBotiquinero && (
          <div>
            <DashboardBotiquin/>
          </div>
        )}
      </div>
    
  );
};
export default DashboardHome;
