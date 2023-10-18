import React from 'react';


const sidebarStyle = {
  backgroundColor: '#00008B',
  color: 'white',
  width: '60px',
  padding: '10px',
  position: 'fixed',     // Fijar la posición
  top: 0,                 // Colocar la barra en la parte superior
  bottom: 0,   
}
export const Sidebar = () => {
  return (
    <div style={sidebarStyle} >
      {/* Contenido de la barra lateral */}
    </div>
  )
}
