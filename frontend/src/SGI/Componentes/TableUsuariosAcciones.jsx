import React from 'react';


export const TablaUsuariosAcciones = ({userData, setModal}) => {
  // console.log(userData);
  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>
            {userData.nombre}
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default TablaUsuariosAcciones;
