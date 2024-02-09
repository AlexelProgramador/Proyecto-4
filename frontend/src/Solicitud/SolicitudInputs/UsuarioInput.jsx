// UsuarioInput.jsx
import React from "react";

const UsuarioInput = ({
  solicitadoPor,
  setSolicitadoPor,
  correo,
  setCorreo,
  anexo,
  setAnexo,
  resumen,
  setResumen,
  Fechaest,
  setFechaest
}) => {
  return (
    <div>
      <div className="form-floating mt-2 g-2">
        <input
          type="text"
          className="form-control"
          value={solicitadoPor}
          onChange={(e) => setSolicitadoPor(e.target.value)}
          required
        />
        <label htmlFor="floatingSelect">Solicitado por</label>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-floating mt-2 g-2">
            <input
              type="text"
              className="form-control"
              id="anexo"
              value={anexo}
              onChange={(e) => setAnexo(e.target.value)}
            />
            <label htmlFor="floatingSelect"> Anexo:</label>
          </div>
        </div>
        <div className="col">
            <div className="form-floating mt-2 g-2">
            <input
              type="text"
              className="form-control"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <label htmlFor="floatingSelect">Correo Electronico:</label>
            </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col">
          <div className="form-floating mt-2 g-2">
          <input
            type="text"
            className="form-control"
            id="resumen"
            value={resumen}
            onChange={(e) => setResumen(e.target.value)}
            required
          />
          <label htmlFor="floatingSelect">Resumen Solicitud</label>
          </div>
        </div>
        <div className="col">
            <div className="form-floating mt-2 g-2">
            <input
            type="date"
            className="form-control"
            id="Fechaest"
            value={Fechaest}
            onChange={(e) => setFechaest(e.target.value)}
            max="9999-12-31"
            required
          />
          <label htmlFor="floatingSelect">Fecha Estimada</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsuarioInput;
