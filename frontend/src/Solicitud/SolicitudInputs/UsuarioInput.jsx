// UsuarioInput.jsx
import React from "react";

const UsuarioInput = ({
  solicitadoPor,
  setSolicitadoPor,
  fecha,
  setFecha,
  setAnexo,
}) => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="solicitadoPor" className="form-label">
          Solicitado por:
        </label>
        <input
          type="text"
          className="form-control"
          id="solicitadoPor"
          value={solicitadoPor}
          onChange={(e) => setSolicitadoPor(e.target.value)}
        />
      </div>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">
              En fecha:
            </label>
            <input
              type="date"
              className="form-control"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="anexo" className="form-label">
              Anexo:
            </label>
            <input
              type="text"
              className="form-control"
              id="anexo"
              onChange={(e) => setAnexo(e.target.value[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsuarioInput
