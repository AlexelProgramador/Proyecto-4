import React from 'react';
import AccionesProductos from './AccionesProductos';

export const TableHomeProducto = ({productoData, setModal, handleShow, handleEdit, handleDelete}) => {
  return (
      <div>
          <div className='card shadow-card rounded-0 border border-0'>
              <div className='card-body'>
                  <div className='d-flex justify-content-between pb-2'>
                      <div className='h5 text-uppercase'>Productos</div>
                      <div className=''><button className='btn btn-success'>Crear <i class="fa-solid fa-plus"></i></button></div>
                  </div>
                  {productoData.length > 0 ? (
                    <div className='table-responsive'>
                      <table className='table'>
                          <thead>
                              <tr>
                                  <th>Nombre Producto</th>
                                  <th>Cantidad Total</th>
                                  <th>Acciones</th>
                              </tr>
                          </thead>
                          <tbody>
                              {productoData.map((item) => (
                                  <tr key={item.id}>
                                      <td>{item.Nombre}</td>
                                      <td>{item.TotalProducto}</td>
                                      <td>
                                          <div className='btn-group btn-group-sm'>
                                          {true ? 
                                            <AccionesProductos 
                                              setModal={setModal} 
                                              item={item} 
                                              handleShow={handleShow}
                                              handleEdit={handleEdit}
                                              handleDelete={handleDelete}
                                            /> :
                                            <button className='btn btn-primary'><i class="fa-solid fa-eye"></i></button>
                                          }
                                          </div>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                    </div>
                    ) :
                    <p>No hay datos de Inventario</p>
                  } 
              </div>
          </div>
      </div>
  );
};

export default TableHomeProducto;