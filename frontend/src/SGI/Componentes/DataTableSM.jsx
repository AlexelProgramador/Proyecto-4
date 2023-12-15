import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataTableSM = ({ data, columns }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  useEffect(() => {
    // Busqueda y filtrado 
    const filtered = data.filter((item) =>
      Object.values(item).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      })
    );

    // Ordenamiento
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        const aRealValue = typeof aValue === 'string' ? aValue.replace(/<\/?[^>]+(>|$)/g, '') : aValue;
        const bRealValue = typeof bValue === 'string' ? bValue.replace(/<\/?[^>]+(>|$)/g, '') : bValue;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (sortConfig.direction === 'ascending') {
            return aRealValue.localeCompare(bRealValue);
          } else {
            return bRealValue.localeCompare(aRealValue);
          }
        } else {
          if (sortConfig.direction === 'ascending') {
            return aValue.toString().localeCompare(bValue.toString());
          } else {
            return bValue.toString().localeCompare(aValue.toString());
          }
        }
      });
    }

    if (filtered.length > 0) {
      setFilteredData(filtered);
    } else {
      // Maneja el caso cuando no hay resultados de búsqueda
      setFilteredData([]);
    }
  }, [data, searchTerm, sortConfig, itemsPerPage]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Resetear a la primera página cuando cambia la cantidad de filas por página
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {/* Busqueda */}
      <div className='p-3 row justify-content-between'>
        <div className='col-sm-6 px-0 pb-1'>
          <input className="form-control form-control-sm"  type="text" placeholder="Buscar" onChange={handleSearch} />
        </div>
        <div className='col-auto px-0 row justify-content-end' style={{ fontSize: '14px' }}>
          {/* Selector de filas por paginas */}
            <div className='col-auto pe-2 align-self-center'>Mostrar</div>
            <div className='col-auto px-0'>
              <select style={{width: '60px'}}
                className="form-select form-select-sm"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className='col-auto ps-2 align-self-center'>registros</div>
        </div>
      </div>

      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              {columns.map((column) => (
                <th style={{ fontSize: '12px' }} className="text-uppercase" key={column.key} onClick={() => handleSort(column.key)}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{item[column.key]}</td>
                ))}
              </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {/* Paginación */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredData.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);
  // atras
  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };
  // adelante
  const handleNext = () => {
    if (currentPage < pageNumbers) {
      paginate(currentPage + 1);
    }
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination pagination-sm justify-content-end">
        <li className="page-item">
          <Link className="page-link" onClick={handlePrevious} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {Array.from({ length: pageNumbers }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <Link onClick={() => paginate(index + 1)} className='page-link'>
              {index + 1}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link className="page-link" onClick={handleNext} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DataTableSM;