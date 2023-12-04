import React from 'react';
import DataTable from './DataTable';

export const TablaAlmacenamiento = ({ setModal, tipoAlmacenamiento, dataAlmacenamiento, handleDelete, handleEdit, handleShow }) => {
  
  let columns = [];
  let data = [];

  if (dataAlmacenamiento.length > 0) {
    columns = [
      { label: `Nombre ${tipoAlmacenamiento === "Botiquín" ? "Botiquín" : "Bodega"}`, key: 'nombre' },
      { label: `Lugar ${tipoAlmacenamiento === "Botiquín" ? "Botiquín" : "Bodega"}`, key: 'lugar' },
      { label: 'Acciones', key: 'acciones' }
    ];

    data = dataAlmacenamiento.map((item) => ({
      nombre: item.Nombre,
      lugar: item.Lugar,
      acciones: (
        <div className='btn-group btn-group-sm'>
          <button
            className='btn btn-primary'
            onClick={() => handleShow(item._id)}>
            <i className="fa-solid fa-eye"></i>
          </button>
          <button
            className='btn btn-warning'
            onClick={() => handleEdit(item._id)}>
            <i className="fa-solid fa-pen"></i>
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
                      onClick={() => { setModal(false) }}>
                      Cancelar
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => { handleDelete(item._id); setModal(false) }}>
                      Eliminar
                    </button>
                  </div>
                </div>
              )
            }}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      )
    }));
  }

  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='d-flex justify-content-between pb-2'>
            <div className='h5 text-uppercase'>{tipoAlmacenamiento === "Botiquín" ? "Botiquines" : "Bodegas"}</div>
            <div className=''>
              <button className='btn btn-success' onClick={() => {
                setModal(
                  <div>
                    {/* creacion */}
                  </div>
                )
              }}>Crear <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          {dataAlmacenamiento.length > 0 ? (
            <div>
              <DataTable data={data} columns={columns} />
            </div>
          ) :
            <p>No hay datos de {tipoAlmacenamiento}</p>
          }
        </div>
      </div>
    </div>
  );
};
export default TablaAlmacenamiento;
