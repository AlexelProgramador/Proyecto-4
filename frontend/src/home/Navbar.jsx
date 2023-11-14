import React from 'react'
import { FaUser } from 'react-icons/fa'; // Importa cualquier icono que quieras usar

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-info">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <FaUser className="d-inline-block align-top" /> {/* Aquí va tu icono */}
        </a>
        <span className="navbar-text">
          Usuario
        </span>
      </div>
    </nav>
  )
}
