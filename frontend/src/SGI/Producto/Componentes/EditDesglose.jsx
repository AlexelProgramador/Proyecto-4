import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { editProductoDesgloce } from '../HandlerProducto';
import { useLocation } from 'react-router-dom';


export const EditDesglose = () => {

  const location = useLocation();
  const { productoData } = location.state || {};
  const { id } = useParams();
  const { idDes} = useParams();
  const productoDataDes = productoData.Desgloce;
  const dataProductoDataDes = productoDataDes.find((data) => data.UuidProducto === idDes);
  console.log(dataProductoDataDes);
  const [nuevoDesgloce, setNuevoDesgloce] = useState({
    UuidProducto: dataProductoDataDes.UuidProducto,
    CantidadContenedor: '',
    CantidadTotal: '',
    ValorTotal: '',
    FechaVencimiento: '',
    Estado: '',
    Nombre:dataProductoDataDes.Nombre,
  });
  const handleAgregarDesgloce = async () => {
    try {
      await editProductoDesgloce(id, nuevoDesgloce, idDes);
      console.log(nuevoDesgloce);
    } catch (error) {
      console.error('Error al actualizar el desgloce', error);
    }
  };

  const handleInputChange = (e) => {
    setNuevoDesgloce({
      ...nuevoDesgloce,
      [e.target.name]: e.target.value
    });
  };
  
  const handleCantidadContenedorChange = (e) => {
    const newValue = e.target.value;
    const cantidadTotal = parseInt(newValue) * productoData.Cantidad || 0;
    const valorTotal = cantidadTotal * productoData.ValorUnitario || 0;
    setNuevoDesgloce({
      ...nuevoDesgloce,
      CantidadContenedor: newValue,
      CantidadTotal: cantidadTotal,
      ValorTotal: valorTotal,
    });
  };
  console.log(nuevoDesgloce);
  return(
    <div>
      <div className='h5 pb-2'>Agregar Nuevo Desglose de Producto</div>
      <div className='row'>
        <div className='col-12 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="text"
              id="Nombre"
              name="Nombre"
              value={nuevoDesgloce.Nombre}
              onChange={handleInputChange}
              readOnly
            />
            <label htmlFor="NombreDesgloce">Nombre del Desglose:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="number"
              id="CantidadContenedor"
              name="CantidadContenedor"
              value={nuevoDesgloce.CantidadContenedor}
              onChange={handleCantidadContenedorChange}
            />
            <label htmlFor="CantidadContenedor">Cantidad Contenedor Producto:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="number"
              id="CantidadTotal"
              name="CantidadTotal"
              value={nuevoDesgloce.CantidadTotal}
              onChange={handleInputChange}
            />
            <label htmlFor="CantidadTotal">Cantidad Total:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="number"
              id="ValorTotal"
              name="ValorTotal"
              value={nuevoDesgloce.ValorTotal}
              onChange={handleInputChange}
            />
            <label htmlFor="ValorTotal">Valor Total:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <input className='form-control'
              type="date"
              id="FechaVencimiento"
              name="FechaVencimiento"
              value={nuevoDesgloce.FechaVencimiento}
              onChange={handleInputChange}
            />
            <label htmlFor="FechaVencimiento">Fecha Vencimiento Producto:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <div className='form-floating'>
            <select className='form-select'
              id="Estado"
              name="Estado"
              value={nuevoDesgloce.Estado}
              onChange={handleInputChange}
            >
              <option value="Sin información">Sin información</option>
              <option value="Buen Estado">Buen Estado</option>
              <option value="Mal Estado">Mal Estado</option>
            </select>
            <label htmlFor="EstadoProducto">Estado Producto:</label>
          </div>
        </div>
        <div className='col-md-4 pb-4'>
          <button className='btn btn-primary' onClick={handleAgregarDesgloce}>Agregar Desglose</button>
        </div>                   
      </div> 
    </div>
  );
};

export default EditDesglose;