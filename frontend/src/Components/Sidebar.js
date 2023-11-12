import React, { useState } from 'react';

export const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
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
              <a href='/' className='nav-link align-middle'>
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
    </main>
  );
};

export default Sidebar;
