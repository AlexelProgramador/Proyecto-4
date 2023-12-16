import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// import logo from '../../img/logo-solo.png';


export const SideBar = ({ show, setShow }) => {
  const response = JSON.parse(localStorage.getItem("response"));
  const isAdmin = response && response.usuario && response.usuario.includes("Administrador") ;
  const isBodeguero = response && response.usuario && response.usuario.includes("Bodeguero");
  const isBotiquinero = response && response.usuario && response.usuario.includes("Botiquinero");
  const almId = response.almacenamiento;

  const navigate = useNavigate();
    const handleSession = () => {
    localStorage.removeItem("response");

    navigate("/login");
    };


    return(
      <div className={show ? 'space-toggle' : null}>
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
              {isAdmin ? (
              <NavLink to='/show-usuario' className='nav-link' activeClassName='active'>
                <i className="fi fi-rr-users-alt nav-logo-link"></i>
                <span>Usuarios</span>
              </NavLink>
              ): null}
              {isAdmin ? (
              <NavLink to='/show-bodega' className='nav-link' activeClassName='active'>
                <i className="fi fi-rr-box-alt nav-logo-link"></i>
                <span>Bodegas</span>
              </NavLink>
              ): null}
              {isAdmin ? (
              <NavLink to='/show-botiquin' className='nav-link' activeClassName='active'>
                <i className='fi fi-rr-doctor nav-logo-link'></i>
                <span>Botiquines</span>
              </NavLink>
              ): null}
              {isBodeguero ? (
              <NavLink to= {`/show-bodega/${almId}`} className='nav-link' activeClassName='active'>
                <i className='fi fi-rr-doctor nav-logo-link'></i>
                <span>Bodega</span>
              </NavLink>
              ): null}
              {isBotiquinero ? (
              <NavLink to= {`/show-botiquin/${almId}`} className='nav-link' activeClassName='active'>
                <i className='fi fi-rr-doctor nav-logo-link'></i>
                <span>Botiquin</span>
              </NavLink>
              ): null}
              {isBodeguero || isAdmin ? (
              <NavLink to='/show-producto' className='nav-link' activeClassName='active'>
                <i className='fi fi-rr-table-columns nav-logo-link'></i>
                <span>Inventario</span>
              </NavLink>
              ): null}
              {isBodeguero || isAdmin || isBotiquinero ? (              
              <NavLink to='/show-solicitud' className='nav-link' activeClassName='active'>
                <i className="fi fi-rr-ballot nav-logo-link"></i>
                <span>Solicitudes</span>
              </NavLink>
              ): null}
              {isBotiquinero || isAdmin ? (              
              <NavLink to='/show-solicitud-botiquin' className='nav-link' activeClassName='active'>
                <i className="fi fi-rr-person-carry-box nav-logo-link"></i>
                <span>Retiros</span>
              </NavLink>
              ): null}
            </div>
          </div>
          {/* <div style={{ position: 'relative', color: '#fff', fontFamily: 'Raleway, sans-serif', display: 'grid', gridTemplateColumns: 'max-content max-content', columnGap: '2rem', padding: '0.5rem 0 0.5rem 1.5rem' }}>
            <div style={{ width: '25px',textAlign: 'center', margin: 'auto' }}>
              <img src={logo} alt="" className='w-100'/>
            </div>
            <div className="d-flex align-items-end">
              <span style={{ fontSize: '14px', margin: 0 }}>Facultad de Odontología<br></br>
                <span className='text-uppercase' style={{ fontSize: '10px' }}>Universidad de Chile</span>
              </span> 
            </div>            
          </div> */}
          <a className='nav-link' onClick={handleSession}>
            <i className='fi fi-rr-sign-out-alt nav-logo-link'></i>
            <span>Salir</span>
          </a>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;