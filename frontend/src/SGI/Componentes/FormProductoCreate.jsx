import React from 'react';

export const FormProducto = ({productoData, setProductoData, handleInsert}) => {

  const handleInputChange = (e) => {
    setProductoData({
      ...productoData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div style={{maxWidth:'800px'}}>
        <div className='h5 text-uppercase pb-2'>Nuevo Producto</div>
        <form className='row'>
          <div className='col-md-6 pb-4'>
            <div className='form-floating'>
              <input className='form-control'
                type="text"
                name="Nombre"
                value={productoData.Nombre}
                onChange={handleInputChange}
              /> 
              <label>Nombre:</label>                               
            </div>
          </div>
          <div className='col-md-6 pb-4'>
            <div className='form-floating'>
              <input className='form-control'
                type="text"
                name="Marca"
                value={productoData.Marca}
                onChange={handleInputChange}
              />
              <label>Marca:</label>                                 
            </div>
          </div>
          <div className='col-12 pb-4'>
            <div className='form-floating'>                
              <textarea className='form-control'
                name="Descripcion"
                value={productoData.Descripcion}
                onChange={handleInputChange}
                rows={4} // Aquí puedes especificar el número de filas que deseas mostrar
                cols={50} // Aquí puedes especificar el número de columnas que deseas mostrar
              />
              <label>Descripción:</label>                
            </div>
          </div>
          <div className='col-md-6 pb-4'>
            <div className='form-floating'>
              <select className='form-select'
                name="Contenedor"
                value={productoData.Contenedor}
                onChange={handleInputChange}
              >
                <option value="Sin Informacion">Sin Información</option>
                <option value="Caja">Caja</option>
                <option value="Kit">Kit</option>
                <option value="Paquete">Paquete</option>
                <option value="Pote">Pote</option>
                <option value="Frasco">Frasco</option>
              </select>
              <label>Seleccione presentación:</label>               
            </div>
          </div>
          <div className='col-md-3 pb-4'>
            <div className='form-floating'>
              <input className='form-control'
                type="number"
                name="Cantidad"
                value={productoData.Cantidad}
                onChange={handleInputChange}
              />
              <label>Cantidad por presentación:</label>
            </div>
          </div>
          <div className='col-md-3 pb-4'>
            <div className='form-floating'>
              <input className='form-control'
                type="number"
                // placeholder="Valor Unitario del Producto"
                name="ValorUnitario"
                value={productoData.ValorUnitario}
                onChange={handleInputChange}
              />
              <label>Valor Unitario del Producto:</label>
            </div>
          </div>    
          <div class="col-12">        
            <button  className="btn btn-primary" type="button" onClick={handleInsert}>
              Insertar Datos de Producto
            </button>              
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormProducto;
