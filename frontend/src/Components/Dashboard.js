import React from 'react'
import { Link } from 'react-router-dom';

const dashboardStyle = {
  backgroundColor: '#E5E7E9',
  padding: '20px',
};

const rolSelectorStyle = {
  display: 'flex',
  marginLeft: 'auto'
};

const buttonStyle = {
  backgroundColor: '#298CFF',
  color: 'white',
  fontSize: 16,
  fontFamily: 'Inter',
  fontWeight: '600',
  lineHeight: 1.2,
  width: 100,
  wordWrap: 'break-word',
  paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, borderRadius: 6, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'
};

const searchFilterStyle = {
  display: 'flex',
  alignItems: 'center',
};

const inputStyle = {
  marginRight: '10px',
};
const listaStyle = {
  backgroundColor: '#808080',
  padding: '20px',
};

const filaStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  alignItems: 'center',
};

const numeroOrdenStyle = {
  width: '20%',
  textAlign: 'center',
};

const estadosStyle = {
  width: '20%',
  textAlign: 'center',
};

const etapaStyle = {
  width: '40%',
  textAlign: 'center',
};

const accionesStyle = {
  width: '20%',
  textAlign: 'center',
};


export const Dashboard = () => {
  const ordenes = [
    { numeroOrden: 1, estado: 'Tu Turno', etapa: 'Orden de prueba 1' },
    { numeroOrden: 2, estado: 'En Proceso', etapa: 'Orden de prueba 2' },
    { numeroOrden: 3, estado: 'Completado', etapa: 'Orden de prueba 3' },
    { numeroOrden: 4, estado: 'Rechaza', etapa: 'Orden de prueba 4' },
  ];
  
  return (

    
    <div style={dashboardStyle}>
      <h2>Seleccione su rol</h2>
      <div style={rolSelectorStyle}>
        <button style={buttonStyle}>Secretaria</button>
        <button style={buttonStyle}>Encargado de presupuesto</button>
        <button style={buttonStyle}>Director</button>
        <button style={buttonStyle}>Encargado de abastecimiento</button>
        <button style={buttonStyle}>Subdirectora</button>
        <button style={buttonStyle}>Bodeguero</button>
        <button style={buttonStyle}>Abogada</button>
      </div>
      <div>
        <h2>Detalles de solicitudes</h2>
        
        <div>
        {/* ... otros elementos ... */}
        <Link to="/crear-solicitud" style={buttonStyle}>Crear Nueva Solicitud</Link>
        </div>
        <div style={searchFilterStyle}>
          <input style={inputStyle} type="text" placeholder="Buscar solicitudes" />
          <button style={buttonStyle} className="yellow-button">Filtrar</button>
        </div>
        <div style={listaStyle}>
      <h2>Lista de Órdenes</h2>
      <div style={filaStyle}>
        <div style={numeroOrdenStyle}>Número de Orden</div>
        <div style={estadosStyle}>Estado</div>
        <div style={etapaStyle}>Etapa</div>
        <div style={accionesStyle}>Acciones</div>
      </div>
      {ordenes.map((orden, index) => (
        <div key={index} style={filaStyle}>
          <div style={numeroOrdenStyle}>{orden.numeroOrden}</div>
          <div style={estadosStyle}>{orden.estado}</div>
          <div style={etapaStyle}>{orden.etapa}</div>
          <div style={accionesStyle}>
            <button>Ver</button>
          </div>
        </div>
        
      ))}
    </div>      
    </div>
    </div>
  );
}

export default Dashboard;