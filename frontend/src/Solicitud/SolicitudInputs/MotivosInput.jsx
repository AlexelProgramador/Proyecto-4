// MotivosInput.jsx
import React from "react";

const MotivosInput = ({
  motivos,
  setMotivos,
  fuenteFinanciamiento,
  setFuenteFinanciamiento,
  montoEstimado,
  setMontoEstimado,
  setArchivos,
}) => {
  return (
    <div>
      <div className="form-floating mt-2 g-2">
        <textarea
          type="text"
          className="form-control"
          id="motivos"
          value={motivos}
          onChange={(e) => setMotivos(e.target.value)}
        />
        <label htmlFor="motivos" className="form-label">
          Argumente los motivos, necesidad de la compra (fundamente):
        </label>
      </div>

      <div className="form-floating mt-2 g-2">
        <textarea
          type="text"
          className="form-control"
          id="fuenteFinanciamiento"
          value={fuenteFinanciamiento}
          onChange={(e) => setFuenteFinanciamiento(e.target.value)}
        />
        <label htmlFor="floatingSelect">Fuente de Financiamiento:</label>
      </div>

      <div className="form-floating mt-2 g-2">
        <input
          type="text"
          className="form-control"
          id="montoEstimado"
          value={montoEstimado}
          onChange={(e) => setMontoEstimado(e.target.value)}
        />
        <label htmlFor="montoEstimado" className="form-label">
          Monto estimado de compra:
        </label>
      </div>

      <div className="mb-3">
        <label htmlFor="montoEstimado" className="form-label">
          Adjuntar antecedentes del/los producto/s:
        </label>
        <input
          type="file"
          className="form-control"
          id="archivo"
          accept="application/pdf"
          multiple
          onChange={(e) => {
            setArchivos(Array.from(e.target.files));
          }}
        />
      </div>
    </div>
  );
};

export default MotivosInput;
