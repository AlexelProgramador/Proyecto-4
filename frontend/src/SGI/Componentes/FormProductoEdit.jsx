import React from 'react';

export const FormProductoEdit = ({productoData, setProductoData, handleUpdate}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoData({ ...productoData, [name]: value });
  };
  return (
    <div>
      <div className='row'>
        <div className='col-md-6 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="text"
              id="Nombre"
              name="Nombre"
              value={productoData.Nombre || ''}
              onChange={handleInputChange}
            />
            <label htmlFor="Nombre">Nombre:</label>
          </div>
        </div>
        <div className='col-md-6 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
                type="text"
                id="Marca"
                name="Marca"
                value={productoData.Marca || ''}
                onChange={handleInputChange}
            />
            <label htmlFor="MarcaProducto">Marca:</label>
          </div>
        </div>
        <div className='col-12 pb-4'>  
          <div className='form-floating'>
            <textarea className='form-control'
              name="Descripcion"
              value={productoData.Descripcion || ''}
              onChange={handleInputChange}
              rows={4} // Aquí puedes especificar el número de filas que deseas mostrar
              cols={50} // Aquí puedes especificar el número de columnas que deseas mostrar
            />
            <label>Descripción:</label>
          </div>
        </div>
        <div className='col-12 pb-4 d-flex justify-content-between'>  
          <label htmlFor="TotalProducto">Total Producto: {productoData.TotalProducto}</label>
          <label htmlFor="TotalProducto">Total Asignado a Bodega: {productoData.TotalAsignado}</label>
          <button className='btn btn-primary' onClick={handleUpdate}>Actualizar Producto</button>
        </div>
      </div>
    </div>
  );
};

export default FormProductoEdit;
