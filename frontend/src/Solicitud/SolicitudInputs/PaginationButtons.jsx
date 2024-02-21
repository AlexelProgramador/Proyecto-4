const PaginationButtons = ({ paginaActual, setPaginaActual, numeroDePaginas, productos, productosPorPagina }) => {
    return (
      <div className="d-flex justify-content-center mt-1 ">
        <button
          className="btn btn-primary mx-1"
          onClick={(e) => {
            e.preventDefault();
            setPaginaActual(paginaActual - 1);
          }}
          disabled={paginaActual === 0}
        >
          Anterior
        </button>
        {Array.from({ length: numeroDePaginas }, (_, index) => (
          <button
            key={index}
            className="btn btn-primary mx-1"
            onClick={(e) => {
              e.preventDefault();
              setPaginaActual(index);
            }}
            disabled={paginaActual === index}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-primary ms-1"
          onClick={(e) => {
            e.preventDefault();
            setPaginaActual(paginaActual + 1);
          }}
          disabled={productos.length / productosPorPagina <= paginaActual + 1}
        >
          Siguiente
        </button>
      </div>
    );
  };
  
  export default PaginationButtons;