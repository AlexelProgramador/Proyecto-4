import { Content } from "./Content";
import { Etapa1 } from "../etapas/Etapa1";
import { Etapa2 } from "../etapas/Etapa2";
import { Etapa3 } from "../etapas/Etapa3";
import { Etapa4 } from "../etapas/Etapa4";
import { Etapa5 } from "../etapas/Etapa5";
import { CrearSolicitud } from "../solicitud/CrearSolicitud";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

import { AlertContext } from "../context/AlertContext";

export const Home = () => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <AlertContext.Provider value={{ showAlert, setShowAlert }}>
    <div className="d-flex flex-column vh-100">

      <nav style={{ height: "4%" }}>
        <Navbar />
      </nav>

      <div className="d-flex flex-grow-1">
        <div style={{ width: "6.60%", backgroundColor: "skyblue", height: "100%" }}>
          <Sidebar />
        </div>

        <div className="bg-secondary col">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="etapa1" element={<Etapa1 />} />
            <Route path="etapa2" element={<Etapa2 />} />
            <Route path="etapa3" element={<Etapa3 />} />
            <Route path="etapa4" element={<Etapa4 />} />
            <Route path="etapa5" element={<Etapa5 />} />
            <Route path="crearSolicitud" element={<CrearSolicitud />} />
          </Routes>
        </div>
      </div>

    </div>
  </AlertContext.Provider>
  );
};
