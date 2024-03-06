import { Content } from "./Content";
import { Pendientes } from "./SolicitudesPendientes";
import { Finalizadas } from "./Finalizadas";
import { Etapa1 } from "../etapas/Etapa1";
import { SolicitudChequeo } from "../etapas/SolicitudChequeo";
import { Etapa2 } from "../etapas/Etapa2";
import { Etapa3 } from "../etapas/Etapa3";
import { Etapa4 } from "../etapas/Etapa4";
import { Etapa5 } from "../etapas/Etapa5";
import { CrearSolicitud } from "../Solicitud/CrearSolicitud";
import { VerSolicitud } from "../solicitud/VerSolicitud";
import { CrearUsuario } from "../Usuario/CrearUsuario";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../context/Error";

import { AlertContext } from "../context/AlertContext";
import MisSolicitudes from "../solicitud/MisSolicitudes";
import HomeUsuario from "../usuario/HomeUsuario";
import { EtapaRechazado } from "../etapas/EtapaRechazado";
import { EtapaDea } from "../etapas/EtapaDea";

export const Home = () => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("response"));
    if (!response) {
      navigate("/login");
    }
  }, []);

  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const userRole = responseLocalStorage?.usuario || [];
  const isAdministrador = userRole.includes("Administrador");
  const isSolicitante = userRole.includes("Solicitante");

  return (
    <AlertContext.Provider value={{ showAlert, setShowAlert }}>
      <div>
        <nav>
          <Navbar />
        </nav>
        <div>
          <div>
            <Sidebar />
          </div>
          <div className="col">
            <Routes>
            {isSolicitante ? (
              <Route path="/" element={<MisSolicitudes />} />
            )            
            : (
              <>
              <Route path="solicitudes" element={<Content />} />
              <Route path="solicitudesFinalizadas" element={<Finalizadas />} />
              <Route path="solicitudChequeo" element={<SolicitudChequeo />} />
              <Route path="etapa1" element={<Etapa1 />} />
              <Route path="etapa2" element={<Etapa2 />} />
              <Route path="etapa3" element={<Etapa3 />} />
              <Route path="etapa4" element={<Etapa4 />} />
              <Route path="etapa5" element={<Etapa5 />} />
              <Route path="etapaDea" element={<EtapaDea />} />
              <Route path="/" element={<Pendientes />} />
              </>
            )}
              <Route path="crearSolicitud" element={<CrearSolicitud />} />
              <Route path="verSolicitud" element={<VerSolicitud />} />
              <Route path="misSolicitudes" element={<MisSolicitudes />} />
              {isAdministrador && (
                <>
                <Route path="misUsuarios" element={<HomeUsuario />} />
                <Route path="crearUsuario" element={<CrearUsuario />} />
                </>
              )}
              <Route path="etapaRechazado" element={<EtapaRechazado />} />

              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      </div>
    </AlertContext.Provider>
  );
};
