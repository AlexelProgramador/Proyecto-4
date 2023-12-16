import React, {useEffect} from 'react';
import { NewDesgloce } from '../Producto/Componentes/NewDesgloce'; 
import { useNavigate } from 'react-router-dom';
import DataTableSM from './DataTableSM';
import EditDesglose from '../Producto/Componentes/EditDesglose';

export const FormDesgloseProducto = ({productoData, cargandoDesgloce, setModal, fetchProducto}) => {
  useEffect(() => {
  }, [productoData]);
  const navigate = useNavigate();
  const handleEdit = (id, idDes) => {
    navigate(`/edit-producto/${id}/desglose/${idDes}`, {state:{productoData}});
    
  };

  let columns = [];
  let data = [];

  if (productoData.Desgloce && productoData.Desgloce.length > 0) {
      columns = [
          { label: 'Nombre Desgloce', key: 'nombre' },
          { label: 'Cantidad Contenedor', key: 'cant1' },
          { label: 'Cantidad Total', key: 'cant' },
          { label: 'Valor Total', key: 'valor' },
          { label: 'Vencimiento Desglose', key: 'fecha' },
          { label: 'Estado Producto', key: 'est' },
          { label: 'Acciones', key: 'acciones' }
      ];
      data = productoData.Desgloce.map((item) => ({
        nombre: item.Nombre,
        cant1: item.CantidadContenedor,
        cant: item.CantidadTotal +' Unidades',
        valor: '$' + item.ValorTotal,
        fecha: item.FechaVencimiento,
        est: item.Estado,
        acciones: (
          <div>
          <button className='btn btn-sm' onClick={() => { handleEdit(productoData._id, item.UuidProducto)
            }}
            ><i className="fa-solid fa-pen"></i>
          </button>
          </div>
          )                
      }));
    }

  return (
    <div>
      {productoData.Desgloce && productoData.Desgloce.length > 0 ? (
        <div>
          <DataTableSM data={data} columns={columns}/>
        </div> 
        ) : 
          <p>No hay desglose de producto disponibles</p>
      }
      {cargandoDesgloce ? 
      <div className="d-flex justify-content-center" style={{height:'200px'}}>
          <div className='d-flex align-items-center'>
              <div className="spinner-border text-secondary" role="status">
                  <span className="visually-hidden">Cargando...</span>
              </div>
          </div>
      </div>
      : <NewDesgloce 
          productoData ={productoData}
          fetchProducto={fetchProducto}/>}
    </div>
  );
};

export default FormDesgloseProducto;
