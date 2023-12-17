import React from 'react';
import DataTable from './DataTable';
import AccionesUsuarios from './AccionesUsuarios';
import CreateUsuario from '../Usuario/CreateUsuario';

export const TableHomeUsuario = ({userData, setModal, handleShow, handleDelete, fetchData}) => {
    let columns = [];
    let data = [];

    // console.log(userData);

    if (userData.length > 0) {
        columns = [
            { label: 'NRO', key: 'nro' },
            { label: 'Nombre', key: 'nombre' },
            { label: 'Nombre de usuario', key: 'username' },
            { label: 'Rol', key: 'rol' },
            { label: 'Acciones', key: 'acciones' }
        ];
        let i = 1;

        data = userData.map((user) => ({
            nro: i++,
            nombre: user.nombre + ' ' + user.apellido,
            username: user.usuario,
            rol: user.rol,
            acciones: (
                <div>
                {true ? 
                    <AccionesUsuarios
                    setModal={setModal} 
                    user={user} 
                    setUser={userData} 
                    handleShow={handleShow}
                    handleDelete={handleDelete}
                    fetchData={fetchData}
                    /> :
                    <button className='btn btn-primary'><i className="fa-solid fa-eye"></i></button>
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
                        <div className='h5 text-uppercase'>Usuarios</div>
                        <div className=''><button className='btn btn-success' onClick={() => {
                            setModal(
                            <div>                                
                                <CreateUsuario setModal={setModal} fetchData={fetchData}/>                                
                            </div>
                            )
                        }}>Crear <i className="fa-solid fa-plus"></i>
                        </button></div>
                    </div>
                    {userData.length > 0 ? (
                        <div>
                        <DataTable data={data} columns={columns} />
                        </div>
                        ) :
                        <p>No hay datos de usuario</p>
                    } 
                </div>
            </div>
        </div>
    );
};

export default TableHomeUsuario;