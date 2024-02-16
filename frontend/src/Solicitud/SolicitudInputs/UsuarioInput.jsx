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
  setFechaest
}) => {
  return (
    <>
      <div className="col-md-12">
        <div className="form-floating g-2">
          <input
            type="text"
            className="form-control"
            value={solicitadoPor}
            onChange={(e) => setSolicitadoPor(e.target.value)}
            required
          />
          <label htmlFor="floatingSelect">Solicitado por</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-floating g-2">
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
      <div className="col-md-6">
          <div className="form-floating g-2">
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
      
      
        <div className="col-md-6">
          <div className="form-floating g-2">
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
        <div className="col-md-6">
            <div className="form-floating g-2">
            <input
            type="date"
            className="form-control"
            id="Fechaest"
            max="9999-12-31"

            onChange={(e) => setFechaest(e.target.value)}
            required
          />
          <label htmlFor="floatingSelect">Fecha Estimada</label>
          </div>
        </div>
    </>
  );
};
export default UsuarioInput;
