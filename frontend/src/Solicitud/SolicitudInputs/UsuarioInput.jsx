// UsuarioInput.jsx
import React from "react";

const UsuarioInput = ({
  solicitadoPor,
  setSolicitadoPor,
  setCorreo,
  setAnexo,
}) => {
  return (
    <div>
      <div className="form-floating mt-2 g-2">
        <input
          type="text"
          className="form-control"
          value={solicitadoPor}
          onChange={(e) => setSolicitadoPor(e.target.value)}
          // required
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
              onChange={(e) => setAnexo(e.target.value[0])}
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
              onChange={(e) => setCorreo(e.target.value)}
            />
            <label htmlFor="floatingSelect"> Correo Electronico:</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsuarioInput;
