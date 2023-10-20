import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const FormrecepcionET7 = () => {
  const [NroCDP, setNroCDP] = useState('');
  const [Estado, setEstado] = useState('');
  const [Nomproveedor, setNomproveedor] = useState('');
  const [Numfactura, setNumfactura] = useState('');
  const [Fechaemifactura, setFechaemifactura] = useState('');
  const [Fechamax, setFechamax] = useState('');
  const [AcepSII, setAcepSII] = useState(1);
  const [Fechavencfact, setFechavencfact] = useState('');
  const [Montofactura, setMontofactura] = useState('');
  const [Comentarios, setComentarios] = useState('');
  const [Fecharecp, setFecharecps] = useState('');
  const [Nomperscargrecep, setNomperscargrecep] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos del formulario
  };

  return (
    <div>
      <h2>Crear Nueva Solicitud</h2>
      <div>
          <button>Comentar Solicitud</button>
      </div>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Nro CDP:</label>
          <input
            type="number"
            value={NroCDP}
            onChange={(e) => setNroCDP(e.target.value)}
          />
        </div>
        <div>
          <label>Estado:</label>
          <input
            type="text"
            value={Estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </div>
        <div>
          <label>Proveedor:</label>
          <input
            type="text"
            value={Nomproveedor}
            onChange={(e) => setNomproveedor(e.target.value)}
          />
        </div>
        <div>
          <label>Nro de factura:</label>
          <input
            type="number"
            value={Numfactura}
            onChange={(e) => setNumfactura(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de emision factura:</label>
          <input
            type="date"
            value={Fechaemifactura}
            onChange={(e) => setFechaemifactura(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha maxima:</label>
          <input
            type="date"
            value={Fechamax}
            onChange={(e) => setFechamax(e.target.value)}
          />
        </div>
        <div>
          <label>Aceptada SII:</label>
            <select
            value={AcepSII}
            onChange={(e) => setAcepSII(e.target.value)}
          >
            <option value="">Selecciona...</option>
            <option value="si">SI</option>aa
            <option value="no">NO</option>
          </select>
        </div>
        <div>
          <label>Fecha de vencimiento factura:</label>
          <input
            type="date"
            value={Fechavencfact}
            onChange={(e) => setFechavencfact(e.target.value)}
          />
        </div>
        <div>
          <label>Monto de la factura:</label>
          <input
            type="number"
            value={Montofactura}
            onChange={(e) => setMontofactura(e.target.value)}
          />
        </div>
        <div>
          <label>Comentario:</label>
          <input
            type="text"
            value={Comentarios}
            onChange={(e) => setComentarios(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de recepcion:</label>
          <input
            type="date"
            value={Fecharecp}
            onChange={(e) => setFecharecps(e.target.value)}
          />
        </div>
        <div>
          <label>Persona a cargo de la recepcion:</label>
          <input
            type="text"
            value={Nomperscargrecep}
            onChange={(e) => setNomperscargrecep(e.target.value)}
          />
        </div>
        <div>
        {/* ... otros elementos ... */}
        <Link to="/" >Terminar Solicitud</Link>
        </div>
      </form>
    </div>
  );
};
