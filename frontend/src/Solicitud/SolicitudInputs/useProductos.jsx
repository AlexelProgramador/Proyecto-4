// useProductos.js
import { useState } from "react";

const useProductos = (productosIniciales, productosPorPagina) => {
  const [productos, setProductos] = useState(productosIniciales);
  const [paginaActual, setPaginaActual] = useState(0);

  const numeroDePaginas = Math.ceil(productos.length / productosPorPagina);

  const productosPaginados = productos.slice(
    paginaActual * productosPorPagina,
    (paginaActual + 1) * productosPorPagina
  );

  const handleAddProducto = (event) => {
    event.preventDefault();

    setProductos([
      ...productos,
      { descripcion: "", cantidad: "", tipoEmpaque: "" },
    ]);
    if (productos.length % productosPorPagina === 0) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const handleProductoChange = (index, field, value) => {
    const newProductos = [...productos];
    newProductos[index + paginaActual * productosPorPagina][field] = value;
    setProductos(newProductos);
  };

  return {
    productos,
    setProductos,
    paginaActual,
    setPaginaActual,
    numeroDePaginas,
    productosPaginados,
    handleAddProducto,
    handleProductoChange,
  };
};

export default useProductos;