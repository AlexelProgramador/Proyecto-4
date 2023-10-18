import './App.css';
import { Primercomponente } from './Components/Primercomponente';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar';
import { Dashboard } from './Components/Dashboard';
import { CrearSolicitud } from './Components/CrearSolicitud';
import { SolicitudEtapa2 } from './Components/SolicitudEtapa2';

function App() {
  const contentStyle = {
    marginLeft: '80px', // Ajustar el margen para dejar espacio para la barra azul
  };
  const datosDeEjemplo = {
    solicitadoPor: 'John Doe',
    fecha: '2023-10-16',
    anexo: 'Anexo 1',
    correoElectronico: 'john@example.com',
    objetoCompra: 'Material de oficina',
    cantidad: 100,
    tipoEmpaque: 'Caja',
    motivosCompra: 'Necesidad de suministros de oficina',
    fuenteFinanciamiento: 'Presupuesto de oficina',
    montoEstimado: '$1000',
  };
  return (
    <Router>
      <div>
        <Sidebar />
        <div className="content" style={contentStyle}>
          <Primercomponente />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crear-solicitud" element={<CrearSolicitud />} />
            <Route path="/solicitud-etapa2" element={<SolicitudEtapa2 solicitudData={datosDeEjemplo}/>} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
