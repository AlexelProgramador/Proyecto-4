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

  // Verificar si se necesita actualizar la página actual
  const numeroDePaginasDespuesDeAgregar = Math.ceil((productos.length + 1) / productosPorPagina);
  if (numeroDePaginasDespuesDeAgregar > numeroDePaginas) {
    setPaginaActual(numeroDePaginasDespuesDeAgregar - 1);
  }
  };

  const handleRemoveProducto = (index) => {
    const updatedProductos = [...productos];
    updatedProductos.splice(index + paginaActual * productosPorPagina, 1); // Eliminar el producto en la posición indicada
    setProductos(updatedProductos);
  
    // Verificar si se necesita actualizar la página actual
    if (updatedProductos.length % productosPorPagina === 0 && paginaActual > 0) {
      setPaginaActual(paginaActual - 1);
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
    handleRemoveProducto,
    handleProductoChange,
  };
};

export default useProductos;
