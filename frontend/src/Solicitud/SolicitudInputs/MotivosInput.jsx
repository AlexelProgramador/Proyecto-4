// MotivosInput.jsx
import React from "react";

const MotivosInput = ({
  motivos,
  setMotivos,
  fuenteFinanciamiento,
  setFuenteFinanciamiento,
  setMontoEstimado,
}) => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="motivos" className="form-label">
          Argumente los motivos, necesidad de la compra (fundamente):
        </label>
        <textarea
          type="text"
          className="form-control"
          id="motivos"
          value={motivos}
          onChange={(e) => setMotivos(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="fuenteFinanciamiento" className="form-label">
          Fuente de Financiamiento:
        </label>
        <textarea
          type="text"
          className="form-control"
          id="fuenteFinanciamiento"
          value={fuenteFinanciamiento}
          onChange={(e) => setFuenteFinanciamiento(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="montoEstimado" className="form-label">
          Monto estimado de compra:
        </label>
        <input
          type="text"
          className="form-control"
          id="montoEstimado"
          onChange={(e) => setMontoEstimado(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="montoEstimado" className="form-label">
          Subir imagen de productos:
        </label>
        <input
          type="file"
          className="form-control"
          id="montoEstimado"
          onChange={(e) => setMontoEstimado(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default MotivosInput