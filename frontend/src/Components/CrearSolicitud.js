import React, { useState } from 'react';
import { Link } from 'react-router-dom';




export const CrearSolicitud = () => {
  const [solicitadoPor, setSolicitadoPor] = useState('');
  const [fecha, setFecha] = useState('');
  const [anexo, setAnexo] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [objetoCompra, setObjetoCompra] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [tipoEmpaque, setTipoEmpaque] = useState('');
  const [motivosCompra, setMotivosCompra] = useState('');
  const [fuenteFinanciamiento, setFuenteFinanciamiento] = useState('');
  const [montoEstimado, setMontoEstimado] = useState('');
  const [adjuntarDocumentos, setAdjuntarDocumentos] = useState('');

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
          <label>Solicitado Por:</label>
          <input
            type="text"
            value={solicitadoPor}
            onChange={(e) => setSolicitadoPor(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div>
          <label>Anexo:</label>
          <input
            type="text"
            value={anexo}
            onChange={(e) => setAnexo(e.target.value)}
          />
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input
            type="text"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
          />
        </div>
        <div>
          <label>Objeto de Compra:</label>
          <input
            type="text"
            value={objetoCompra}
            onChange={(e) => setObjetoCompra(e.target.value)}
          />
        </div>
        <div>
          <label>Cantidad:</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <div>
          <label>Tipo de Empaque:</label>
          <select
            value={tipoEmpaque}
            onChange={(e) => setTipoEmpaque(e.target.value)}
          >
            <option value="">Selecciona...</option>
            <option value="Caja">Caja</option>
            <option value="Bolsa">Bolsa</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div>
          <label>Argumento y Motivos de la Compra:</label>
          <textarea
            value={motivosCompra}
            onChange={(e) => setMotivosCompra(e.target.value)}
          />
        </div>
        <div>
          <label>Fuente de Financiamiento:</label>
          <input
            type="text"
            value={fuenteFinanciamiento}
            onChange={(e) => setFuenteFinanciamiento(e.target.value)}
          />
        </div>
        <div>
          <label>Monto Estimado de la Compra:</label>
          <input
            type="text"
            value={montoEstimado}
            onChange={(e) => setMontoEstimado(e.target.value)}
          />
        </div>
        <div>
          <label>Adjuntar Documentos:</label>
          <input
            type="file"
            onChange={(e) => setAdjuntarDocumentos(e.target.value)}
          />
        </div>
        <div>
        {/* ... otros elementos ... */}
        <Link to="/solicitud-etapa2" >Crear Nueva Solicitud</Link>
        </div>
      </form>
    </div>
  );
};
