import './App.css';
import { Primercomponente } from './Components/Primercomponente';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Sidebar } from './Components/Sidebar';
import { Dashboard } from './Components/Dashboard';
import { CrearSolicitud } from './Components/CrearSolicitud';
import { SolicitudEtapa2 } from './Components/SolicitudEtapa2';
import { SolicitudEtapa3 } from './Components/SolicitudEtapa3';
import { CrearBoletacompra } from './Components/CrearBoletaCompraET4';
import { ActualizacionSoliET5 } from './Components/ActualizacionEnvioET5';
import { ActualizacionSoliET6 } from './Components/ActualizacionEnvioET6';
import { FormrecepcionET7 } from './Components/FormularioRecepcionET7';


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
    codigoCosto: '$4000'
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
            <Route path="/solicitud-etapa3" element={<SolicitudEtapa3 solicitudData={datosDeEjemplo}/>} />
            <Route path="/solicitud-etapa4" element={<CrearBoletacompra/>}/>
            <Route path="/solicitud-etapa5" element={<ActualizacionSoliET5/>}/>
            <Route path="/solicitud-etapa6" element={<ActualizacionSoliET6/>}/>
            <Route path="/solicitud-etapa7" element={<FormrecepcionET7/>}/>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
