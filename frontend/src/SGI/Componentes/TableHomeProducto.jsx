import React from 'react';
import DataTable from './DataTable';
import AccionesProductos from './AccionesProductos';
import CreateProducto from '../Producto/CreateProducto';

export const TableHomeProducto = ({productoData, setModal, handleShow, handleEdit, handleDelete, fetchData}) => {
    let columns = [];
    let data = [];

    if (productoData.length > 0) {
        columns = [
            { label: 'Nombre Producto', key: 'nombre' },
            { label: 'Cantidad Total', key: 'cant' },
            { label: 'Acciones', key: 'acciones' }
        ];
        data = productoData.map((item) => ({
            nombre: item.Nombre,
            cant: item.CantidadTotal || 0,
            acciones: (
                <div>
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
                )                
            }));
        }

    return (
        <div>
            <div className='card shadow-card rounded-0 border border-0'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between pb-2'>
                        <div className='h5 text-uppercase'>Productos</div>
                        <div className=''><button className='btn btn-success' onClick={() => {
                            setModal(
                            <div>                                
                                <CreateProducto setModal={setModal} fetchData={fetchData}/>                                
                            </div>
                            )
                        }}>Crear <i className="fa-solid fa-plus"></i>
                        </button></div>
                    </div>
                    {productoData.length > 0 ? (
                        <div>
                        <DataTable data={data} columns={columns} />
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