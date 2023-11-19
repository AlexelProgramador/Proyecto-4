import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Cookies from "js-cookie";
import SeccionDiasSinAtender from "./SeccionDiasSinAtender";
import useFetch from "../hooks/useFetch";


export const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef(null);

  const toggleTable = () => {
    setShowTable(!showTable);
  };
  const handleSession = () => {
    Cookies.remove("response");
    navigate("/login");
  };
  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setShowTable(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredSoli, setIsHoveredSoli] = useState(false);
  const { data, loading, error } = useFetch("etapas");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = data
    ? data.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : [];

  return (
    <main className={show ? "space-toggle" : null}>
      <header className={`header ${show ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? "fa-solid fa-xmark" : null}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </i>
        </div>
        <div>
      <button onClick={toggleTable}>Notificaciones</button>

      {showTable && (
        <div ref={tableRef} className="w-55 h-30 mx-auto d-block card shadow-card rounded-3 mt-1 border border-0">
          <div className="card-body">
            <div className="mt-5 d-flex justify-content-between pb-0">
              <div className=" mt-5 h4 text-uppercase">
                Solicitudes sin antender por 1 dia
              </div>
            </div>
            <SeccionDiasSinAtender data={data} />
          </div>
        </div>
      )}
    </div>
      </header>
      {/* SIDEBAR */}
      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            {/* SIDEBAR HEADER */}
            <div>
              <a href="/" className="nav-logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-file-earmark-plus nav-logo-link"
                  viewBox="0 0 25 16"
                >
                  <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                </svg>
                <span className="nav-logo-name">Menu Principal</span>
              </a>
            </div>
            {/* ITEMS */}

            <div className="nav-list">
            <div
                onClick={() => {
                  navigate("crearSolicitud");
                }}
                style={{
                  cursor: "pointer",
                  color: isHoveredSoli ? "green" : "grey",
                }}
                onMouseEnter={() => setIsHoveredSoli(true)}
                onMouseLeave={() => setIsHoveredSoli(false)}
                className="d-flex nav-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-file-earmark"
                  viewBox="3 0 10 25"
                >
                  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                </svg>
                <span className="ml-auto">Crear solicitud</span>
              </div>
              <div
                onClick={() => {
                  navigate("crearSolicitud");
                }}
                style={{
                  cursor: "pointer",
                  color: isHoveredSoli ? "green" : "grey",
                }}
                onMouseEnter={() => setIsHoveredSoli(true)}
                onMouseLeave={() => setIsHoveredSoli(false)}
                className="d-flex nav-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-file-earmark"
                  viewBox="3 0 10 25"
                >
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                </svg>
                <span className="ml-auto">Mis solicitudes</span>
              </div>


            </div>
          </div>

          <div
            href="/logout"
            className="nav-link mr-2"
            onClick={handleSession}
            style={{ color: isHovered ? "red" : "grey" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-file-earmark"
                  viewBox="3 0 10 25"
                >
              <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
              <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
            </svg>
                <span className="ml-auto">Cerrar Sesion</span>
            </div>

        </nav>
      </aside>
      {/* CONTENIDO */}
    </main>
  );
};

export default Sidebar;
