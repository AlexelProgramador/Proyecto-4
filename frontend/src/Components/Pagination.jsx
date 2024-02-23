import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderPageNumbers = () => {
    if (totalPages <= 3) {
      // Si hay 3 páginas o menos, muestra todos los números de página
      return pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={pageNumber === currentPage ? "btn btn-primary" : "btn btn-outline-secondary"}
          style={{ margin: "1px" }}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ));
    } else {
      // Si hay más de 3 páginas, muestra los números de página con elipsis
      let renderedNumbers = [];
      if (currentPage <= 2) {
        renderedNumbers = [1, 2, 3, "...", totalPages];
      } else if (currentPage >= totalPages - 1) {
        renderedNumbers = [1, "...", totalPages - 2, totalPages - 1, totalPages];
      } else {
        renderedNumbers = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }

      return renderedNumbers.map((number, index) => {
        if (number === "...") {
          return (
            <span key={index} style={{ padding: "10px" }}>
              ...
            </span>
          );
        }
        return (
          <button
            key={index}
            className={number === currentPage ? "btn btn-primary" : "btn btn-outline-secondary"}
            style={{ margin: "1px" }}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        );
      });
    }
  };

  return (
    <div>
      <button
        className="btn btn-outline-secondary"
        style={{ margin: "1px" }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {renderPageNumbers()}
      <button
        className="btn btn-outline-secondary"
        style={{ margin: "1px" }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
