import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from './HandlerProducto';

export const CreateProducto = () => {
  const [productoData, setProductoData] = useState({
    NombreProducto: '',
    MarcaProducto: '',
    DescripcionProducto: '',
    ContenedorProducto: 'Sin Información',
    CantidadProducto: '',
    CantidadTotalProducto: 0,
    CantidadAsignadaProducto: 0,
    ValorUnitarioProducto: '',
    DesgloceProducto: [],
    UbicacionProducto: []
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProductoData({
      ...productoData,
      [e.target.name]: e.target.value
    });
  };

  const handleInsert = async () => {
    createProducto(productoData)
      .then(data => {
        console.log(data);
        navigate('/show-producto');
      })
      .catch(error => {
        console.error('Error al insertar datos: ', error);
      });
  };

  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Nuevo Producto</div>
          <div>
            <form className='row'>
              <div className='col-md-6 pb-4'>
                <div className='form-floating'>
                  <input className='form-control'
                    type="text"
                    // placeholder="Nombre del Producto"
                    name="NombreProducto"
                    value={productoData.NombreProducto}
                    onChange={handleInputChange}
                  /> 
                  <label>Nombre:</label>                               
                </div>
              </div>
              <div className='col-md-6 pb-4'>
                <div className='form-floating'>
                  <input className='form-control'
                    type="text"
                    // placeholder="Marca del Producto"
                    name="MarcaProducto"
                    value={productoData.MarcaProducto}
                    onChange={handleInputChange}
                  />
                  <label>Marca:</label>                                 
                </div>
              </div>
              <div className='col-12 pb-4'>
                <div className='form-floating'>                
                  <textarea className='form-control'
                    // placeholder="Descripción del Producto"
                    name="DescripcionProducto"
                    value={productoData.DescripcionProducto}
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
                    name="ContenedorProducto"
                    value={productoData.ContenedorProducto}
                    onChange={handleInputChange}
                  >
                    <option value="Sin Informacion">Sin Información</option>
                    <option value="Caja">Caja</option>
                    <option value="Kit">Kit</option>
                    <option value="Paquete">Paquete</option>
                    <option value="Pote">Pote</option>
                    <option value="Frasco">Frasco</option>
                  </select>
                  <label>Seleccione:</label>               
                </div>
              </div>
              <div className='col-md-3 pb-4'>
                <div className='form-floating'>
                  <input className='form-control'
                    type="number"
                    // placeholder="Cantidad del Producto"
                    name="CantidadProducto"
                    value={productoData.CantidadProducto}
                    onChange={handleInputChange}
                  />
                  <label>Cantidad del Producto:</label>
                </div>
              </div>
              <div className='col-md-3 pb-4'>
                <div className='form-floating'>
                  <input className='form-control'
                    type="number"
                    // placeholder="Valor Unitario del Producto"
                    name="ValorUnitarioProducto"
                    value={productoData.ValorUnitarioProducto}
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
      </div>
    </div>
  );
};

export default CreateProducto;
