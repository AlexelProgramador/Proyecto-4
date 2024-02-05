import React, { useState, useEffect, useRef } from "react";
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
    localStorage.removeItem("response");
    navigate("/login");
  };
  const handleClickOutside = (event) => {
    if (tableRef.current && !tableRef.current.contains(event.target)) {
      setShowTable(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredSoli, setIsHoveredSoli] = useState(false);
  const [isHoveredMySoli, setIsHoveredMySoli] = useState(false);
  const { data, loading, error } = useFetch("etapas");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const user = responseLocalStorage?.nombreusuario;
  const userRole = responseLocalStorage?.usuario || [];
  const isSolicitante = userRole.includes("Solicitante");
  const isAdministrador = userRole.includes("Administrador");

  console.log("response", user)
  console.log("rol", isAdministrador)
  console.log("rol", isSolicitante)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = data
    ? data.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : [];

  return (
    <main className={show ? "space-toggle" : null}>
      <header className={`header ${show ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? "fa-solid fa-xmark" : null}`}></i>
        </div>
        <div className="d-flex justify-content-end align-middle" style={{color:"#1E4162"}}> 
          <div
            className="notification-container"
            style={{ position: "relative" }}
          >
            <div
              style={{ padding: "0px", width: "30px", border: "none"}}
              className="btn"
              onClick={toggleTable}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style={{
              fill: "#1E4162",
              transition: "fill 0.3s",
            }}
            // Pseudo-clases para :hover y :active
            onMouseOver={(e) => e.currentTarget.setAttribute("style", "fill: gray")}
            onMouseOut={(e) => e.currentTarget.setAttribute("style", "fill: #1E4162")}
            onMouseDown={(e) => e.currentTarget.setAttribute("style", "fill: gray")}
            onMouseUp={(e) => e.currentTarget.setAttribute("style", "fill: gray")}
            viewBox="0 0 448 512">
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>
            </div>
            {showTable && (
              <div
                className="notificaciones"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 20,
                  zIndex: 1,
                  background: "white",
                  border: "0px solid #1E4162",
                  boxShadow: "0px 3px 3px 2px rgba(0, 0, 0, 0.20)",
                  width: "25vw",
                  padding: "10px",
                  borderRadius: "5px",
                  color: "rgba(0, 0, 0, 0.87)",
                  fontSize: "14px",
                }}
              >
                <h6 className="border-bottom pb-2" style={{color: "rgba(0, 0, 0, 0.87)", fontSize: "14px"}}> 
                  Solicitudes sin verificar por 3 dias
                </h6>
                <SeccionDiasSinAtender data={data} />
              </div>
            )}
          </div>
          <div>Usuario {user}</div>
        </div>
      </header>
      {/* SIDEBAR */}
      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            {/* SIDEBAR HEADER */}
            <div>
              <a href="/" className="nav-logo">
                <i className="fas fa-home-alt nav-logo-icon" />
                <span className="nav-logo-name">Menu principal</span>
              </a>
            </div>
            {/* ITEMS */}

            <div className="nav-list">
              {isSolicitante ? null : (
              <div
                onClick={() => {
                  navigate("solicitudes");
                }}
                style={{
                  cursor: "pointer",
                  color: isHoveredMySoli ? "white" : "grey",
                }}
                onMouseEnter={() => setIsHoveredMySoli(true)}
                onMouseLeave={() => setIsHoveredMySoli(false)}
                className="d-flex nav-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg"  x="0px"
                  y="0px"
                  width="36"
                  height="36" fill="currentColor" class="bi bi-files-alt" viewBox="3 0 8 19">
                  <path d="M11 0H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2 2 2 0 0 0-2-2m2 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1zM2 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg>
                <span className="ml-auto">Solicitudes</span>
              </div>
              )}
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
                className="d-flex nav-link "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  fill="currentColor"
                  viewBox="3 0 8 19"
                >
                  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                </svg>
                <span className="ml-auto">Crear solicitud</span>
              </div>
              <div
                onClick={() => {
                  navigate("misSolicitudes");
                }}
                style={{
                  cursor: "pointer",
                  color: isHoveredMySoli ? "blue" : "grey",
                }}
                onMouseEnter={() => setIsHoveredMySoli(true)}
                onMouseLeave={() => setIsHoveredMySoli(false)}
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
                  viewBox="3 0 8 19"
                >
                  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                </svg>
                <span className="ml-auto">Mis solicitudes</span>
              </div>
              {isAdministrador && (
              <div
                onClick={() => {
                  navigate("misUsuarios");
                }}
                style={{
                  cursor: "pointer",
                  color: isHoveredMySoli ? "white" : "grey",
                }}
                onMouseEnter={() => setIsHoveredMySoli(true)}
                onMouseLeave={() => setIsHoveredMySoli(false)}
                className="d-flex nav-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg"  x="0px"
                  y="0px" width="35" height="35" fill="currentColor" class="bi bi-people" viewBox="3 0 8 19">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                </svg>                
                <span className="ml-auto">Usuarios</span>
              </div>
              )}
            </div>
          </div>
          <div
            href="/logout"
            className="nav-link d-flex"
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
              <path
                fill-rule="evenodd"
                d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
              />
            </svg>
            Cerrar sesion
          </div>
        </nav>
      </aside>
      {/* CONTENIDO */}
    </main>
  );
};

export default Sidebar;
