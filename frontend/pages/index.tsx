import React, { useState, useEffect } from 'react';


interface UserData {
    rut: string;
    nombre_usuario: string;
    contraseña: string;
    Correo_Electronico: string;
    Nombre_Completo: string;
}

function App() {
    const [formData, setFormData] = useState<UserData>({
        rut: '',
        nombre_usuario: '',
        contraseña: '',
        Correo_Electronico: '',
        Nombre_Completo: '',
    });

    const datos = ["RUT (ID)",'Nombre Usuario','Contraseña','Correo Electrónico','Nombre Completo']
    const valor_datos = ['rut','nombre_usuario','contraseña','Correo_Electronico','Nombre_Completo']

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
                        rut: '',
                        nombre_usuario: '',
                        contraseña: '',
                        Correo_Electronico: '',
                        Nombre_Completo: '',
                    });
                    setEditing(false);
                })
                .catch(error => {
                    console.error('Error al actualizar el usuario:', error);
                });
        } else {
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
                        rut: '',
                        nombre_usuario: '',
                        contraseña: '',
                        Correo_Electronico: '',
                        Nombre_Completo: '',
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
            Correo_Electronico: user.Correo_Electronico,
            Nombre_Completo: user.Nombre_Completo,
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
            <h1 className='font-bold'>CRUD de Usuarios</h1>
            <div className='bg-white relative shadow-md sm:rounded-lg overflow-hidden'>
                <div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                    {datos.map((dato,index) => {
                        return (
                            <input key={index}
                                className="border rounded-md p-2 w-75 mx-1"
                                id={valor_datos[index]}
                                placeholder={dato}
                                value={formData[valor_datos[index]]}
                                onChange={(e) => setFormData({ ...formData, [valor_datos[index]]: e.target.value })}
                            />
                            )
                    })}
                    </div>
                    <button
                        className="items-center bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 m-2"
                        type="submit"
                    >
                        {editing ? 'Editar' : 'Crear'}
                    </button>
                </form>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-xs border-y">
                            <tr>
                                <th className="px-4 py-4">RUT (ID)</th>
                                <th className="px-4 py-4">NOMBRE</th>
                                <th className="px-4 py-4">CORREO</th>
                                <th className="px-4 py-4">NOMBRE COMPLETO</th>
                                <th className="px-4 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.rut} className="border-b">
                                    <td className="px-4 py-2 text-gray-900 whitespace-nowrap">{user.rut}</td>
                                    <td className="px-4 py-2 text-gray-900">{user.nombre_usuario}</td>
                                    <td className="px-4 py-2 text-gray-900">{user.Correo_Electronico}</td>
                                    <td className="px-4 py-2 text-gray-900">{user.Nombre_Completo}</td>
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
