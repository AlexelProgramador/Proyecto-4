import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-3">
      <input
        className="form-control me-2 w-30"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar número de solicitud, orden de compra y solicitado por"
      />
    </div>
  );
};

export default SearchBar;
