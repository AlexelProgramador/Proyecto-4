// ProductoInput.jsx
import React from "react";
const ProductoInput = ({ index, producto, handleProductoChange, handleRemoveProducto }) => {
  
  const unidadesEmpaque = [
    "Ampolla", "Año", "Atado", "Balde", "Balón", "Bandeja", "Barra", "Bidón", "Bloque", "Block",
    "Bolsa", "Botella", "Caja", "Cajetilla", "Cajón", "Carga", "Carrete", "Cartón", "Cartucho", "Centímetro",
    "Centímetros Cúbicos", "Cientos", "Cilindro", "Comprimido", "Comprimido Vaginal", "Cono", "Cuñete", "Día",
    "Día/Hombre", "Disco", "Docena", "Dosis", "Frasco", "Frasco Ampolla", "Galón", "Global", "Gramo",
    "Gragea", "Gruesa", "Hoja", "Hora", "Hora/Hombre", "Juego", "Kit", "Kilogramo", "Lata",
    "Lámina", "Libra", "Litro", "Matraz", "Mes", "Mes/Hombre", "Metro Cuadrado", "Metro Cúbico", "Metro Lineal",
    "Miles", "Milígramo", "Mililitro", "Milímetro", "Microgramo", "Ovillo", "Ovulo", "Pack", "Pan",
    "Papelillo", "Par", "Paquete", "Pie", "Pieza", "Placa", "Pliego", "Plancha", "Pomo",
    "Pote", "Pulgada", "Quincena", "Rack", "Resma", "Rollo", "Saco", "Sachet", "Semana",
    "Sobre", "Supositorio", "Talonario", "Tarro", "Tineta", "Tira", "Tonelada", "Tubo", "Unidad",
    "Unidad Internacional", "Unidad no definida", "Vial"
  ];
  
  return (
    <>
      <div className="col-md-6">
        <div className="form-floating g-3">
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
      </div>

      <div className="col-md-2">
        <div className="form-floating g-3">
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
      </div>

      <div className="col">
        <div className="form-floating g-3">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            value={producto.tipoEmpaque} // Establece el valor del select aquí
            onChange={(e) =>
              handleProductoChange(index, "tipoEmpaque", e.target.value)
            }
          >
              <option>Escoja una opción</option>
            {/* Mapear las opciones del empaque */}
            {unidadesEmpaque.map((opcion, i) => (
              <option key={i} value={opcion}>{opcion}</option>
            ))}
          </select>
          <label htmlFor="tipo de empaque">Unidad de empaque</label>
        </div>
      </div>
      <div className="col-auto justify-content-center d-flex align-items-center">
        <div
          type="button"
          className="btn border-0 text-center d-grid gap-2 px-1 ps-0"
          onClick={() => handleRemoveProducto(index)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
          </svg>
        </div>
      </div>
    </>
  );
};

export default ProductoInput;
