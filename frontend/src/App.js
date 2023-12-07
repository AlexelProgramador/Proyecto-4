import './App.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { Primercomponente } from './Components/Primercomponente';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Sidebar } from './Components/Sidebar';
// import { Dashboard } from './Components/Dashboard';
// import { CrearSolicitud } from './Components/CrearSolicitud';
// import { SolicitudEtapa2 } from './Components/SolicitudEtapa2';
// import { SolicitudEtapa3 } from './Components/SolicitudEtapa3';
// import { CrearBoletacompra } from './Components/CrearBoletaCompraET4';
// import { ActualizacionSoliET5 } from './Components/ActualizacionEnvioET5';
// import { ActualizacionSoliET6 } from './Components/ActualizacionEnvioET6';
// import { FormrecepcionET7 } from './Components/FormularioRecepcionET7';
import { HomeBodega } from './SGI/Almacenamiento/Bodega/HomeBodega';
import { CreateBodega } from './SGI/Almacenamiento/Bodega/CreateBodega';
import { HomeProducto } from './SGI/Producto/HomeProducto';
import { CreateProducto } from './SGI/Producto/CreateProducto';
import { EditBodega } from './SGI/Almacenamiento/Bodega/EditBodega';
import { EditProducto } from './SGI/Producto/EditProducto';
import { ShowProducto } from './SGI/Producto/ShowProducto';
import { ShowBodega } from './SGI/Almacenamiento/Bodega/ShowBodega';
import { HomeBotiquin } from './SGI/Almacenamiento/Botiquin/HomeBotiquin';
import { CreateBotiquin } from './SGI/Almacenamiento/Botiquin/CreateBotiquin';
import { EditBotiquin } from './SGI/Almacenamiento/Botiquin/EditBotiquin';
import { ShowBotiquin } from './SGI/Almacenamiento/Botiquin/ShowBotiquin'
import { HomeSolicitudBodega } from './SGI/Solicitud/HomeSolicitudBodega';
import { CreateSolicitudBodega } from './SGI/Solicitud/CreateSolicitudBodega';
import { ShowSolicitudBodega } from './SGI/Solicitud/ShowSolicitudBodega';
import { DashboardBodega } from './SGI/Almacenamiento/Bodega/DashboardBodega';
import { ModalProvider } from "./Components/Modal";
import { PrimerRender } from './SGI/PDFRenderer/PrimerRender';
import { CreateSolicitudBotiquin } from './SGI/SolicitudBotiquin/CreateSolicitudBotiquin';
import { ShowSolicitudBotiquin } from './SGI/SolicitudBotiquin/ShowSolicitudBotiquin';
import { Login } from './SGI/Login/Login'
import ComponenteDashboardBodega from './SGI/Almacenamiento/Bodega/Componente/ComponenteDashboardBodega';

function App() {
  const [show, setShow] = useState(false);
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
              <NavLink to='/dashboard-bodega' className='nav-link' activeClassName='active' end>
                <i className='fas fa-fw fa-tachometer-alt nav-logo-link'></i>
                <span>Dashboard</span>
              </NavLink>

              <NavLink to='/show-bodega' className='nav-link' activeClassName='active'>
                <i class="fa-solid fa-table-columns nav-logo-link"></i>
                <span>Inventario</span>
              </NavLink>

              <NavLink to='/show-botiquin' className='nav-link' activeClassName='active'>
                <i className='fas fa-image nav-logo-link'></i>
                <span>seccion2</span>
              </NavLink>

              <NavLink to='/show-producto' className='nav-link' activeClassName='active'>
                <i className='fas fa-dollar-sign nav-logo-link'></i>
                <span>seccion3</span>
              </NavLink>
            </div>
          </div>
          <a href='/logout' className='nav-link'>
            <i className='fas fa-sign-out nav-logo-link'></i>
            <span>Logout</span>
          </a>
        </nav>
      </aside>
      {/* CONTENIDO */}
      <ModalProvider>
      <div className="container-fluid pt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ComponenteDashboardBodega />} />
          </Routes>
        </div>
        </ModalProvider>
      </main>   
      </div>  
    </Router>
  );
}

export default App;
