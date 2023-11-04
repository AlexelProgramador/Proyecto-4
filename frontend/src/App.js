import './App.css';
import React, { useState } from 'react';
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
import { HomeBodega } from './SGI/Bodega/HomeBodega';
import { CreateBodega } from './SGI/Bodega/CreateBodega';
import { HomeProducto } from './SGI/Producto/HomeProducto';
import { CreateProducto } from './SGI/Producto/CreateProducto';
import { EditBodega } from './SGI/Bodega/EditBodega';
import { EditProducto } from './SGI/Producto/EditProducto';
import { ShowProducto } from './SGI/Producto/ShowProducto';
import { ShowBodega } from './SGI/Bodega/ShowBodega';


function App() {
  const [show, setShow] = useState(false);
  const contentStyle = {
    marginLeft: show ? '80px' : '0', // Ajusta el margen izquierdo según si el Sidebar está abierto o cerrado
    transition: 'margin 0.3s', // Agrega una transición para suavizar el efecto
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
        <Sidebar/>
        <div className="content" style={contentStyle}>
          <h1>a</h1>
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

            {/* Rutas Sistema Inventario*/}
            <Route path="/show-bodega" element ={<HomeBodega/>}/>
            <Route path="/create-bodega" element ={<CreateBodega/>}/>
            <Route path="/edit-bodega/:id" element ={<EditBodega/>}/>
            <Route path="/show-bodega/:id" element ={<ShowBodega/>}/>

            <Route path="/show-producto" element ={<HomeProducto/>}/>
            <Route path="/create-producto" element ={<CreateProducto/>}/>
            <Route path="/edit-producto/:id" element ={<EditProducto/>}/>
            <Route path="/show-producto/:id" element ={<ShowProducto/>}/>
            
            

          </Routes>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
