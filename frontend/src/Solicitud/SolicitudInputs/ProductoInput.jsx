// ProductoInput.jsx
import React from "react";
const ProductoInput = ({ index, producto, handleProductoChange }) => {
  return (
    <div key={index} className="row">     
      <div key={index} className="form-floating mt-3 g-3 col-6 mb-3" >
      <input
          type="text"
          className="form-control"
          value={producto.descripcion}
          onChange={(e) =>
            handleProductoChange(index, "descripcion", e.target.value)
          }
        />
              <label htmlFor="floatingSelect">Descripción del producto:</label>
      </div>

      <div className="form-floating mt-3 g-3 col-3 mb-4">
      <input
          type="number"
          className="form-control"
          value={producto.cantidad}
          onChange={(e) =>
            handleProductoChange(index, "cantidad", e.target.value)
          }
        />
          <label htmlFor="floatingSelect">Cantidad:</label>
      </div>

      <div className="form-floating  mt-3 g-3 col-3 mb-4">
      <input
          type="text"
          className="form-control"
          value={producto.tipoEmpaque}
          onChange={(e) =>
            handleProductoChange(index, "tipoEmpaque", e.target.value)
          }
        />
              <label htmlFor="floatingSelect">Tipo de empaque:</label>
      </div>

    </div>
  );
};

export default ProductoInput