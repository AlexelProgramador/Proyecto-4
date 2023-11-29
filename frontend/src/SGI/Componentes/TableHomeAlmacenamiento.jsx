import React from 'react';

export const TablaAlmacenamiento = ({setModal,tipoAlmacenamiento, dataAlmacenamiento, handleDelete, handleEdit, handleShow}) => {
    return (
      <div>
        <div className='card shadow-card rounded-0 border border-0'>
          <div className='card-body'>
            <div className='d-flex justify-content-between pb-2'>
              <div className='h5 text-uppercase'>{tipoAlmacenamiento === "Botiquín" ? "Botiquines": "Bodegas"}</div>
              <div className=''>
                <button className='btn btn-success' onClick={() => { 
                  setModal(
                    <div className="flex flex-col justify-center items-center 
                    w-[350px] h-[350px] border-amber-400 border-4 rounded-md">
                    </div>
                  )}}>Crear 
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            {dataAlmacenamiento.length > 0 ? (
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Nombre {tipoAlmacenamiento === "Botiquín" ? "Botiquín": "Bodega"}</th>
                      <th>Lugar {tipoAlmacenamiento === "Botiquín" ? "Botiquín": "Bodega"}</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataAlmacenamiento.map((item) => (
                      <tr key={item.id}>
                        <td>{item.Nombre}</td>
                        <td>{item.Lugar}</td>
                        <td>
                          <div className='btn-group btn-group-sm'>
                            <button 
                              className='btn btn-primary' 
                              onClick={() => handleShow(item._id)}>
                              <i class="fa-solid fa-eye"></i>
                            </button>
                            <button 
                              className='btn btn-warning' 
                              onClick={() => handleEdit(item._id)}>
                              <i class="fa-solid fa-pen"></i>
                            </button>
                            <button 
                              className='btn btn-danger' 
                              onClick={() => { 
                                setModal(
                                  <div className=''>
                                    <div className='text-uppercase h6'>Confirmar</div>
                                    <div className='text-center pt-3'>¿Está seguro que desea eliminar este registro?</div>
                                    <p className='fw-semibold'>{item.Nombre}</p>
                                    <div className='text-end'>
                                    <button 
                                      className='btn me-2' 
                                      onClick={() => {setModal(false)}}>
                                      Cancelar
                                    </button>
                                    <button 
                                      className='btn btn-danger' 
                                      onClick={() => {handleDelete(item._id); setModal(false)}}>
                                      Eliminar
                                    </button>
                                    </div>
                                  </div>
                                )}}>
                              <i class="fa-solid fa-trash-can"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              ): 
              <p>No hay datos de {tipoAlmacenamiento}</p>
            }       
          </div>
        </div>
    </div>
  );
};
export default TablaAlmacenamiento;
