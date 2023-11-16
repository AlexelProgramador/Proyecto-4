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
import { HomeBotiquin } from './SGI/Botiquin/HomeBotiquin';
import { CreateBotiquin } from './SGI/Botiquin/CreateBotiquin';
import { EditBotiquin } from './SGI/Botiquin/EditBotiquin';
import { ShowBotiquin } from './SGI/Botiquin/ShowBotiquin'
import { HomeSolicitudBodega } from './SGI/Solicitud/HomeSolicitudBodega';
import { CreateSolicitudBodega } from './SGI/Solicitud/CreateSolicitudBodega';
import { ShowSolicitudBodega } from './SGI/Solicitud/ShowSolicitudBodega';
import { DashboardBodega } from './SGI/Bodega/DashboardBodega';

function App() {
  const [show, setShow] = useState(false);

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
      <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
          <div className=''>
            {/* <img src="https://odontologia.uchile.cl/.resources/portal-odontologia/images/logo-odontologia.svg" alt=""/> */}
          </div>
        </div>
      </header>
      {/* SIDEBAR */}
      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            {/* SIDEBAR HEADER */}
            <a href='/' className='nav-logo'>
              <i className='fas fa-home-alt nav-logo-icon'/>
              <span className='nav-logo-name'>CASITA</span>
            </a>
            {/* ITEMS */}
            <div className='nav-list'>
              <a href='/dashboard-bodega' className='nav-link'>
                <i className='fas fa-fw fa-tachometer-alt nav-logo-link'></i>
                <span>Dashboard</span>
              </a>
              
              <a href='/show-bodega' className='nav-link'>
                <i className='fas fa-hotel  nav-logo-link'></i>
                <span>seccion1</span>
              </a>
              <a href='/create-bodega' className='nav-link'>
                <i className='fas fa-image nav-logo-link'></i>
                <span>seccion2</span>
              </a>
              <a href='/' className='nav-link'>
                <i className='fas fa-dollar-sign nav-logo-link'></i>
                <span>seccion3</span>
              </a>
            </div>
          </div>
          <a href='/logout' className='nav-link'>
            <i className='fas fa-sign-out nav-logo-link'></i>
            <span>Logout</span>
          </a>
        </nav>
      </aside>
      {/* CONTENIDO */}
      <div className="container-fluid pt-4">
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
            <Route path="/dashboard-bodega" element ={<DashboardBodega/>}/>

            <Route path="/show-producto" element ={<HomeProducto/>}/>
            <Route path="/create-producto" element ={<CreateProducto/>}/>
            <Route path="/edit-producto/:id" element ={<EditProducto/>}/>
            <Route path="/show-producto/:id" element ={<ShowProducto/>}/>
            
            <Route path="/show-botiquin" element ={<HomeBotiquin/>}/>
            <Route path="/create-botiquin" element ={<CreateBotiquin/>}/>
            <Route path="/edit-botiquin/:id" element ={<EditBotiquin/>}/>
            <Route path="/show-botiquin/:id" element ={<ShowBotiquin/>}/>

            <Route path="/show-solicitud" element ={<HomeSolicitudBodega/>}/>
            <Route path="/create-solicitud" element ={<CreateSolicitudBodega/>}/>
            <Route path="/show-solicitud/:id" element ={<ShowSolicitudBodega/>}/>
            

          </Routes>
        </div>
      </main>   
      </div>  
    </Router>
  );
}

export default App;
