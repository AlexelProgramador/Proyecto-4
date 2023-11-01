import React, { useState } from 'react';
// import './sidebar.css';

export const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
        </div>
      </header>

      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            <a href='/' className='nav-logo'>
              <i className={`fas fa-home-alt nav-logo-icon`}></i>
              <span className='nav-logo-name'>Casita</span>
            </a>
            <div className='nav-list'>
              <a href='/' className='nav-link'>
                <i className='fas fa-tachometer-alt nav-link-icon'></i>
                <span className='nav-link-name'>Dashboard</span>
              </a>
              <a href='/show-bodega' className='nav-link'>
                <i className='fas fa-hotel nav-link-icon'></i>
                <span className='nav-link-name'>seccion1</span>
              </a>
              <a href='/create-bodega' className='nav-link'>
                <i className='fas fa-image nav-link-icon'></i>
                <span className='nav-link-name'>seccion2</span>
              </a>
              <a href='/' className='nav-link'>
                <i className='fas fa-dollar-sign nav-link-icon'></i>
                <span className='nav-link-name'>seccion3</span>
              </a>
            </div>
          </div>
          <a href='/logout' className='nav-link'>
            <i className='fas fa-sign-out nav-link-icon'></i>
            <span className='nav-link-name'>Logout</span>
          </a>
        </nav>
      </aside>
      a
    </main>
  );
};

export default Sidebar;

// import React from 'react'

// function Sidebar() {
//   return (
//     <div className='container-fluid'>
//       <div className='row'>
//         <div className='bg-dark col-auto col-md-3 min-vh-100'>
//           <a href='/' className='text-decoration-none text-white d-flex align-itemcenter'>
//             <i className='fs-4 bi bi-speedomenter'></i>
//             <span className='ms-1 fs-4'>Brand</span>
//           </a>
//           <ul class="nav nav-pills flex-column">
//             <li class="nav-item text-white fs-4">
//               <a href="/" class="nav-link" aria-current="page">Active</a>
//             </li>
//             <li class="nav-item text-white fs-4">
//               <a href="/" class="nav-link">Link</a>
//             </li>
//             <li class="nav-item text-white fs-4">
//               <a href="/" class="nav-link">Disabled</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Sidebar;
// import React from 'react'

// export const Sidebar = () => {
//   return (
//     <main>
//       <header className='header'>
//         <div className='header-toggle'>
//           <i class="fa-solid fa-bars"></i>
//         </div>
//       </header>
//       <aside className='sidebar'>
//         <nav className='nav'>
//           <div>
//             <a href='/' className='nav-logo'>
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
//             <path d="M3 10.5651C3 9.99071 3 9.70353 3.07403 9.43907C3.1396 9.2048 3.24737 8.98446 3.39203 8.78887C3.55534 8.56807 3.78202 8.39176 4.23539 8.03914L11.0177 2.76401C11.369 2.49076 11.5447 
//             2.35413 11.7387 2.30162C11.9098 2.25528 12.0902 2.25528 12.2613 2.30162C12.4553 2.35413 12.631 2.49076 12.9823 2.76401L19.7646 8.03914C20.218 8.39176 20.4447 8.56807 20.608 8.78887C20.7526 
//             8.98446 20.8604 9.2048 20.926 9.43907C21 9.70353 21 9.99071 21 10.5651V17.8C21 18.9201 21 19.4802 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H6.2C5.07989 
//             21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V10.5651Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//             </svg>            
//             </a>
//           </div>
//         </nav>
//       </aside>
//     </main>
//   )
// }

// export default Sidebar;

// import React from 'react';


// const sidebarStyle = {
//   backgroundColor: '#00008B',
//   color: 'white',
//   width: '60px',
//   padding: '10px',
//   position: 'fixed',     // Fijar la posición
//   top: 0,                 // Colocar la barra en la parte superior
//   bottom: 0,   
// }

// export const Sidebar = () => {
//   return (
//     <main>
//       <div className='sidebar'>
//         {/* Contenido de la barra lateral */}
//         <nav className='nav'>
//           <div>
//             <a href='/' className='nav-logo'>

//             </a>
//           </div>
//         </nav>
//       </div>
//     </main>
//   )
// }
