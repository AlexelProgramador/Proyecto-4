import React from 'react';
import { ShowUsuario } from '../Usuario/ShowUsuario';

export const AccionesUsuarios = ({user ,setModal, handleShow, handleEdit, handleDelete, fetchData}) => {
  return (
    <div>
      <div className='btn-group btn-group-sm'>
        <button className='btn btn-primary' onClick={
                () => 
                  setModal(
                    <ShowUsuario 
                      setModal={setModal} 
                      user={user} 
                      fetchData={fetchData}
                      />)}><i className="fa-solid fa-eye"></i></button>
        <button className='btn btn-warning'onClick={() => handleEdit(user._id)}><i className="fa-solid fa-pen"></i></button>
        <button className='btn btn-danger' onClick={() => { 
          setModal(
            <div className=''>
              <div className='text-uppercase h6'>Confirmar</div>
              <div className='text-center pt-3'>¿Está seguro que desea eliminar este registro?</div>
              <p className='fw-semibold'>{user.nombre}</p>
              <div className='text-end'>
              <button className='btn me-2'  onClick={() => {setModal(false)}}>Cancelar</button>
              <button className='btn btn-danger' onClick={() => handleDelete(user._id)} >Eliminar</button>
              </div>
            </div>
          )
        }}><i className="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  );
};

export default AccionesUsuarios;
