// ProductoInput.jsx
import React from "react";
const ProductoInput = ({ index, producto, handleProductoChange }) => {
  return (
    <div key={index} className="row">
      <div className="col-6 mb-3">
        <label className="form-label">Descripción del producto:</label>
        <input
          type="text"
          className="form-control"
          value={producto.descripcion}
          onChange={(e) =>
            handleProductoChange(index, "descripcion", e.target.value)
          }
        />
      </div>
      <div className="col-3 mb-3">
        <label className="form-label">Cantidad:</label>
        <input
          type="number"
          className="form-control"
          value={producto.cantidad}
          onChange={(e) =>
            handleProductoChange(index, "cantidad", e.target.value)
          }
        />
      </div>
      <div className="col-3 mb-3">
        <label className="form-label">Tipo de empaque:</label>
        <input
          type="text"
          className="form-control"
          value={producto.tipoEmpaque}
          onChange={(e) =>
            handleProductoChange(index, "tipoEmpaque", e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default ProductoInput