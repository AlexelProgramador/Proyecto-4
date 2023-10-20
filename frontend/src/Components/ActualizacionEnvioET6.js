import React, { useState } from 'react';
import { Link } from 'react-router-dom';




export const ActualizacionSoliET6 = () => {
  const [Fechaestenvprov, setFechaestenvprov] = useState('');
  const [Estadocomp, setEstadocomp] = useState('');
  const [Comentario, setComentario] = useState('');
  const [adjuntarDocumentos, setadjuntarDocumentos] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos del formulario
  };

  return (
    <div>
      <h2>Actulizacion de envio </h2>
      <div>
          <button>Comentar Solicitud</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha estimada de envio:</label>
          <input
            type="text"
            value={Fechaestenvprov}
            onChange={(e) => setFechaestenvprov(e.target.value)}
          />
        </div>
        <div>
          <label>Estado de compra:</label>
          <input
            type="text"
            value={Estadocomp}
            onChange={(e) => setEstadocomp(e.target.value)}
          />
        </div>
        <div>
          <label>Comentario:</label>
          <input
            type="text"
            value={Comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </div>
        <div>
          <label>Adjuntar Documentos:</label>
          <input
            type="file"
            onChange={(e) => setadjuntarDocumentos(e.target.value)}
          />
        </div>
        <div>
        {/* ... otros elementos ... */}
        <Link to="/solicitud-etapa7" >Actualizar estado Solicitud</Link>
        </div>
      </form>
    </div>
  );
};
