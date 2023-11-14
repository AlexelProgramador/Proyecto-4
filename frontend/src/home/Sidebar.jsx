import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

export const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredSoli, setIsHoveredSoli] = useState(false);

  return (
    <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`} style={{ backgroundColor: "darkblue" }} >
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
        </div>
      </header>
      {/* SIDEBAR */}
      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            {/* SIDEBAR HEADER */}
            <a href='/' className='nav-logo'style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2em", margin: "1em 0"  }}>
              <FaHome className='nav-logo-icon'/>
            </a>
            {/* ITEMS */}
            <div className='nav-list'>
              <div
                onClick={() => {
                    navigate("crearSolicitud");
                }}
                style={{ cursor: "pointer" , color: isHoveredSoli ? "green" : "grey"}}
                onMouseEnter={() => setIsHoveredSoli(true)}
                onMouseLeave={() => setIsHoveredSoli(false)}
                className='nav-link'
              >
               <div>
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    fill="currentColor"
    className="bi bi-file-earmark-plus nav-logo-link"
    viewBox="0 0 16 16"
  >
    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
  </svg>
  <span>Crear solicitud</span>
</div>
                </div>
              </div>

            </div>
          </div>
          <a href='/logout' className='nav-link'   style={{ color: isHovered ? "red" : "grey" }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
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