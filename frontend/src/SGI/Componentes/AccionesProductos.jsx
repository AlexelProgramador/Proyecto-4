import React, {useEffect} from 'react';

export const AccionesProductos = ({item, setModal,handleShow, handleEdit, handleDelete}) => {
  return (
    <div>
      <div className='btn-group btn-group-sm'>
        <button className='btn btn-primary' onClick={() => handleShow(item._id)}><i class="fa-solid fa-eye"></i></button>
        <button className='btn btn-warning'onClick={() => handleEdit(item._id)}><i class="fa-solid fa-pen"></i></button>
        <button className='btn btn-danger' onClick={() => { 
          setModal(
            <div className=''>
              <div className='text-uppercase h6'>Confirmar</div>
              <div className='text-center pt-3'>¿Está seguro que desea eliminar este registro?</div>
              <p className='fw-semibold'>{item.Nombre}</p>
              <div className='text-end'>
              <button className='btn me-2'  onClick={() => {setModal(false)}}>Cancelar</button>
              <button className='btn btn-danger' onClick={() => handleDelete(item._id)} >Eliminar</button>
              </div>
            </div>
          )
        }}><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  );
};

export default AccionesProductos;
