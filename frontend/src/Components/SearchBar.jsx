import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="mb-3">
      <div className="row">
        <div className="col-md-4">
        <input
        className="form-control me-2"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar número de solicitud, orden de compra y solicitado por"
      />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
