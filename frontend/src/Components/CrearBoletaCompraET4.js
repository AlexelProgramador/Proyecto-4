import React, { useState } from 'react';
import { Link } from 'react-router-dom';




export const CrearBoletacompra = () => {
  const [TipoCompra, setTipoCompra] = useState('');
  const [Nrocotizacion, setNrocotizacion] = useState('');
  const [Estado, setEstado] = useState('');
  const [Comentarios, setComentarios] = useState('');
  const [Nroordencompra, setNroordencompra] = useState('');
  const [Fechaoc, setFechaoc] = useState(1);
  const [ProvSeleccionado, setProvSeleccionado] = useState('');
  const [Fechaentregaprov, setFechaentregaprov] = useState('');
  const [Valorcompramiva, setValorcompramiva] = useState('');
  const [Fechaauthcompra, setFechaauthcompra] = useState('');
  const [adjuntarDocumentos, setadjuntarDocumentos] = useState('');

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
          <label>Tipo de compra:</label>
          <input
            type="text"
            value={TipoCompra}
            onChange={(e) => setTipoCompra(e.target.value)}
          />
        </div>
        <div>
          <label>Nro cotizacion:</label>
          <input
            type="number"
            value={Nrocotizacion}
            onChange={(e) => setNrocotizacion(e.target.value)}
          />
        </div>
        <div>
          <label>Estado:</label>
            <select
            value={Estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Selecciona...</option>
            <option value="Caja">Bien</option>
            <option value="Bolsa">XD</option>
            <option value="Otro">malito</option>
          </select>
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
          <label>N° Orden de compra:</label>
          <input
            type="number"
            value={Nroordencompra}
            onChange={(e) => setNroordencompra(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de OC:</label>
          <input
            type="date"
            value={Fechaoc}
            onChange={(e) => setFechaoc(e.target.value)}
          />
        </div>
        <div>
          <label>Proveedor Seleccionado:</label>
          <input
            type="text"
            value={ProvSeleccionado}
            onChange={(e) => setProvSeleccionado(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha entrega proveedor:</label>
          <input
            type="date"
            value={Fechaentregaprov}
            onChange={(e) => setFechaentregaprov(e.target.value)}
          />
        </div>
        <div>
          <label>Valor de comprar con IVA:</label>
          <input
            type="number"
            value={Valorcompramiva}
            onChange={(e) => setValorcompramiva(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha autorizacion de compra:</label>
          <input
            type="date"
            value={Fechaauthcompra}
            onChange={(e) => setFechaauthcompra(e.target.value)}
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
        <Link to="/solicitud-etapa5" >Crear Solicitud</Link>
        </div>
      </form>
    </div>
  );
};
