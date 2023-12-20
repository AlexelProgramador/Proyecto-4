// ProductoInput.jsx
import React from "react";
const ProductoInput = ({ index, producto, handleProductoChange }) => {
  return (
    <div key={index} className="row">
      <div key={index} className="form-floating mt-3 g-3 col-6 mb-3">
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

      <div className="form-floating  mt-3 g-1 col-3 mb-4">
        <select
          className="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          value={producto.tipoEmpaque} // Establece el valor del select aquí
          onChange={(e) =>
            handleProductoChange(index, "tipoEmpaque", e.target.value)
          }
        >
          <option>tipo de empaque</option>
          <option value="Unidad">Unidad</option>
          <option value="Bidon">Bidon</option>
          <option value="Bolsa">Bolsa</option>
          <option value="Botella">Botella</option>
          <option value="Caja">Caja</option>
          <option value="Docena">Docena</option>
          <option value="Kilo">Kilo</option>
          <option value="Litro">Litro</option>
          <option value="Onza">Onza</option>
          <option value="Pack">Pack</option>
          <option value="Pallet">Pallet</option>
          <option value="Par">Par</option>
          <option value="Pieza">Pieza</option>
          <option value="Plancha">Plancha</option>
          <option value="Pliego">Pliego</option>
          <option value="Resma">Resma</option>
          <option value="Rollo">Rollo</option>
          <option value="Sachet">Sachet</option>
          <option value="Saco">Saco</option>
        </select>
        <label htmlFor="tipo de empaque">tipo de empaque</label>
      </div>
    </div>
  );
};

export default ProductoInput;
