import React, { useState, useEffect, useRef } from "react";
import { FaUser } from 'react-icons/fa'; // Importa cualquier icono que quieras usar
import { useNavigate } from 'react-router-dom';
import useFetch from "../hooks/useFetch";
import NotificationSection from "./Notifications";


export const Navbar = ({ show, setShow }) => {
  // const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const responseLocalStorage = JSON.parse(localStorage.getItem("response"));
  const user = responseLocalStorage?.nombreusuario;
  const userId = responseLocalStorage?.usuarioId;
  const [isHoveredNoti, setIsHoveredNoti] = useState(false);
  const { data, loading, error } = useFetch("etapas");
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef(null);

  const toggleTable = () => {
    setShowTable(!showTable);
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

  return (
    <div>
      <header className={`header ${show ? "space-toggle" : null}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? "fa-solid fa-xmark" : null}`}></i>
        </div>
        <div className="d-flex justify-content-end align-items-center" style={{color:"#1E4162"}}> 
          <NotificationSection
            toggleTable={toggleTable}
            showTable={showTable}
            data={data}
            userId={userId}
          />
          <div className="align-middle ps-2">{" "}{user}</div>
        </div>
      </header>
    </div>
  )
}
