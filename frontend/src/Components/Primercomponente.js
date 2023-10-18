import React from 'react'


const contenedorgris = {
    backgroundColor: '#808080', // Color gris en hexadecimal
    padding: '20px',  // Aumentamos el relleno para hacer la barra más grande
    display: 'flex',
    justifyContent: 'space-between',
  };

  const botonUsuario = {
    backgroundColor: 'blue', // Color de fondo del botón de usuario
    color: 'white', // Color del texto del botón de usuario
    padding: '10px 20px',
    borderRadius: '5px',
  };
export const Primercomponente = () => {
  return (
    <div style={contenedorgris}>
      {/* Contenido de la barra de navegación */}
      <div>
        <a href="/">Inicio</a>
        <a href="/acerca-de">Acerca de</a>
        <a href="/contacto">Contacto</a>
      </div>
      <div style={botonUsuario}>
        Usuario
      </div>
    </div>
  )
}
