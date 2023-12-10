import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';



export const SideBar = ({ show, setShow }) => {
  const response = JSON.parse(localStorage.getItem("response"));
  const isAdmin = response && response.usuario && response.usuario.includes("Administrador") ;
  const isBodeguero = response && response.usuario && response.usuario.includes("Bodeguero");
  const isBotiquinero = response && response.usuario && response.usuario.includes("Botiquinero");

  const navigate = useNavigate();
    const handleSession = () => {
    localStorage.removeItem("response");

    navigate("/login");
    };
    return(
      <div className={show ? 'space-toggle' : null}>
        {/* <header className={`header ${show ? 'space-toggle' : null}`}>
          <div className='header-toggle' onClick={() => setShow(!show)}>
            <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
            <div className=''>
              <img src="https://odontologia.uchile.cl/.resources/portal-odontologia/images/logo-odontologia.svg" alt=""/>
            </div>
          </div>
        </header> */}
        <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            {/* SIDEBAR HEADER */}
            <a href='/' className='nav-logo'>
              <i className='fi fi-rr-house-blank nav-logo-icon'/>
              <span className='nav-logo-name'>CASITA</span>
            </a>
            {/* ITEMS */}
            <div className='nav-list'>
              <NavLink to='/' className='nav-link' activeClassName='active' end>
                <i className='fi fi-rr-tachometer nav-logo-link'></i>
                <span>Dashboard</span>
              </NavLink>
              {isBodeguero || isAdmin ? (
              <NavLink to='/show-bodega' className='nav-link' activeClassName='active'>
                <i class="fi fi-rr-box-alt nav-logo-link"></i>
                <span>Bodegas</span>
              </NavLink>
              ): null}
              {isBotiquinero || isAdmin ? (
              <NavLink to='/show-botiquin' className='nav-link' activeClassName='active'>
                <i className='fi fi-rr-doctor nav-logo-link'></i>
                <span>Botiquines</span>
              </NavLink>
              ): null}
              {isBodeguero || isBotiquinero || isAdmin ? (
              <NavLink to='/show-producto' className='nav-link' activeClassName='active'>
                <i className='fi fi-rr-table-columns nav-logo-link'></i>
                <span>Inventario</span>
              </NavLink>
              ): null}
              {isAdmin && (
              <NavLink to='/show-solicitud' className='nav-link' activeClassName='active'>
                <i class="fi fi-rr-ballot nav-logo-link"></i>
                <span>Solicitudes</span>
              </NavLink>
              )}
            </div>
          </div>
          <a className='nav-link'onClick={handleSession}>
            <i className='fi fi-rr-sign-out-alt nav-logo-link'></i>
            <span>Salir</span>
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;