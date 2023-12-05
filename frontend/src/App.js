import './App.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ModalProvider } from "./Components/Modal";
import { Login } from "./SGI/Login/Login"

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
          </Routes>
        </div>
        </ModalProvider>
      </main>   
      </div>  
    </Router>
  );
}

export default App;
