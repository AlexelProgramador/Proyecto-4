import { Content } from "./Content";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AlertContext } from "../context/AlertContext";

export const Home = () => {
  const [showAlert, setShowAlert] = useState(false);

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
              <Route path="/" element={<Content />} />
              <Route path="etapa0" element={<Etapa1chequeo />} />
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
