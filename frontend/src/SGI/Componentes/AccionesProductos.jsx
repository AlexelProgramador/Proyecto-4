import React from 'react';

export const AccionesProductos = ({item, setModal}) => {
  return (
    <div>
      <button className='btn btn-primary'><i class="fa-solid fa-eye"></i></button>
        <button className='btn btn-warning'><i class="fa-solid fa-pen"></i></button>
        <button className='btn btn-danger' onClick={() => { 
          setModal(
            <div className=''>
              <div className='text-uppercase h6'>Confirmar</div>
              <div className='text-center pt-3'>¿Está seguro que desea eliminar este registro?</div>
              <p className='fw-semibold'>{item.NombreBodega}</p>
              <div className='text-end'>
              <button className='btn me-2'  onClick={() => {setModal(false)}}>Cancelar</button>
              <button className='btn btn-danger' >Eliminar</button>
              </div>
            </div>
          )
        }}><i class="fa-solid fa-trash-can"></i></button>
    </div>
  );
};

export default AccionesProductos;
