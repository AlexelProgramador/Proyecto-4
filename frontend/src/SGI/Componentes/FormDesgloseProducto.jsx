import React, {useEffect} from 'react';
import { NewDesgloce } from '../Producto/Componentes/NewDesgloce'; 
import { useNavigate } from 'react-router-dom';

export const FormDesgloseProducto = ({productoData, cargandoDesgloce}) => {
  useEffect(() => {
  }, [productoData]);
  const navigate = useNavigate();
  const handleEdit = (id, idDes) => {
    navigate(`/edit-producto/${id}/desglose/${idDes}`, {state:{productoData}});
    
  };

  return (
    <div>
      {productoData.Desgloce && productoData.Desgloce.length > 0 ? (
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>Cantidad del Contenedor</th>
                <th>Cantidad Total</th>
                <th>Valor Total</th>
                <th>Fecha Vencimiento del Desglose</th>
                <th>Estado Producto</th>
                <th>Accion</th>
              </tr>
            </thead>
            <tbody>
              {productoData.Desgloce.map((item, index) => (
                <tr key={index}>
                  <td>{item.CantidadContenedor}</td>
                  <td>{item.CantidadTotal} Unidades</td>
                  <td>${item.ValorTotal} Pesos</td>
                  <td>{item.FechaVencimiento}</td>
                  <td>{item.Estado}</td>
                  <td><button className='btn btn-sm'onClick={() => handleEdit(productoData._id, item.UuidProducto)}><i class="fa-solid fa-pen"></i></button></td>
                </tr>
                ))
              }
            </tbody>
          </table>
        </div>  
        ) : 
          <p>No hay desglose de producto disponibles</p>
      }
      {cargandoDesgloce ? 
      <div class="d-flex justify-content-center" style={{height:'200px'}}>
          <div className='d-flex align-items-center'>
              <div class="spinner-border text-secondary" role="status">
                  <span class="visually-hidden">Cargando...</span>
              </div>
          </div>
      </div>
      : <NewDesgloce productoData ={productoData}/>}
    </div>
  );
};

export default FormDesgloseProducto;
