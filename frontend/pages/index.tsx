import React, { useState, useEffect } from 'react';


interface UserData {
    nombre_usuario: string;
    rut: string;
    contraseña: string;
    correoElectronico: string;
    nombre: string;
    apellido: string;
    idUsuario: string;
}

function App() {
    const [formData, setFormData] = useState<UserData>({
        nombre_usuario: '',
        rut: '',
        contraseña: '',
        correoElectronico: '',
        nombre: '',
        apellido: '',
        idUsuario: ''
    });

    const datos = ['Nombre Usuario',"RUT (ID)",'Contraseña','Correo Electrónico','Nombre','Apellido','idUsuario']
    const valor_datos = ['nombre_usuario',"rut",'contraseña','correoElectronico','nombre','apellido','idUsuario']

    const [users, setUsers] = useState<UserData[]>([]);
    const [editing, setEditing] = useState(false);

    //Fetch que obtiene los usuarios existentes
    useEffect(() => {
        // Realiza una solicitud GET inicial para obtener los usuarios existentes.
        fetch('http://127.0.0.1:5000/api/usuarios/')
            .then(response => response.json())
            .then((data: UserData[]) => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error al obtener usuarios:', error);
            });
    }, []);
    //Crear/Editar Usuario

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (editing) {
            // Si estamos editando, realiza una solicitud PUT para actualizar el usuario existente.
            fetch(`http://127.0.0.1:5000/api/usuarios/update/${formData.rut}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then((data: UserData) => {
                    // Actualiza la lista de usuarios después de la edición.
                    setUsers(users.map(user => (user.rut === data.rut ? data : user)));
                    setFormData({
                        nombre_usuario: '',
                        rut: '',
                        contraseña: '',
                        correoElectronico: '',
                        nombre: '',
                        apellido: '',
                        idUsuario: ''
                    });
                    setEditing(false);
                })
                .catch(error => {
                    console.error('Error al actualizar el usuario:', error);
                });
        } else {
            // Agrega el nuevo usuario a la lista local antes de hacer la solicitud POST al servidor.
            const newUser: UserData = { ...formData };
            setUsers([...users, newUser]);
            
            // Si no estamos editando, realiza una solicitud POST para crear un nuevo usuario.
            fetch('http://127.0.0.1:5000/api/usuarios/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then((data: UserData) => {
                    // Agrega el nuevo usuario a la lista.
                    setUsers([...users, data]);
                    setFormData({
                        nombre_usuario: '',
                        rut: '',
                        contraseña: '',
                        correoElectronico: '',
                        nombre: '',
                        apellido: '',
                        idUsuario: ''
                    });
                })
                .catch(error => {
                    console.error('Error al crear el usuario:', error);
                });
        }
    };

    //Edición de Usuario
    const handleEdit = (user: UserData) => {
        // Rellena el formulario con los datos del usuario seleccionado para editar.
        setFormData({
            rut: user.rut,
            nombre_usuario: user.nombre_usuario,
            contraseña: user.contraseña,
            correoElectronico: user.correoElectronico,
            nombre: user.nombre,
            apellido: user.apellido,
            idUsuario: user.idUsuario
        });
        setEditing(true);
    };

    //Eliminación de Usuario
    const handleDelete = (rut: string) => {
        // Realiza una solicitud DELETE para eliminar el usuario.
        fetch(`http://127.0.0.1:5000/api/usuarios/delete/${rut}`, {
            method: 'DELETE',
        })
            .then(() => {
                // Elimina el usuario de la lista.
                setUsers(users.filter(user => user.rut !== rut));
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error);
            });
    };

    return (
        <div className="App">
            <div className='bg-white relative shadow-md sm:rounded-lg overflow-hidden py-2'>
            <h1 className='font-bold px-2'>CRUD de Usuarios</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='py-4 px-2'>
                            <div className="grid gap-2 mb-2 sm:grid-cols-3 sm:gap-2 sm:mb-2">
                            {datos.map((dato,index) => {
                                return (
<input 
    key={index}
    className="border rounded-none p-2 w-100 text-sm"
    id={valor_datos[index]}
    placeholder={dato}
    value={formData[valor_datos[index]] ?? ''}
    onChange={(e) => setFormData({ ...formData, [valor_datos[index]]: e.target.value })}
/>
                                    )
                            })}
                            </div>
                            <div className='grid justify-items-end'>
                            <button
                                className="rounded-none bg-blue-500 hover:bg-blue-600 text-white p-2 w-40"
                                type="submit" >
                                {editing ? 'Editar' : 'Crear'}
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs border-y">
                            <tr>
                                <th className="px-4 py-4">USUARIO</th>
                                <th className="px-4 py-4">CORREO</th>
                                <th className="px-4 py-4">NOMBRE APELLIDO</th>
                                <th className="px-4 py-4">ID</th>
                                <th className="px-4 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.rut} className="border-b">

                                    <td className="px-4 py-2 text-gray-900">{user.nombre_usuario}</td>
                                    <td className="px-4 py-2 text-gray-900">{user.correoElectronico}</td>
                                    <td className="px-4 py-2 text-gray-900">{user.nombre} {user.apellido}</td>
                                    <td className="px-4 py-2 text-gray-900">{user.idUsuario}</td>
                                    <td className="px-4 py-2 text-gray-900 flex items-center justify-end">
                                        <button className='text-green-500 hover:text-green-400 p-2'
                                            onClick={() => handleEdit(user)}>Editar</button>
                                        <button className='text-red-500 hover:text-red-400 p-2' 
                                            onClick={() => handleDelete(user.rut)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
