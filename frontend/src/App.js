import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { spacing } from '@mui/system';
import { Box } from '@mui/material';



function App() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre_usuario: '',
    contraseña: '',
    Correo_Electronico: '',
    Nombre_Completo: '',
  });

  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Realiza una solicitud GET inicial para obtener los usuarios existentes.
    fetch('http://127.0.0.1:5000/api/usuarios/')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

  const handleSubmit = (event) => {
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
        .then(data => {
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
        .then(data => {
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

  const handleEdit = (user) => {
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

  const handleDelete = (rut) => {
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
      <h1>CRUD de Usuarios</h1>
      <form onSubmit={handleSubmit}>
        <Box sx={{'& > :not(style)': { m: 1, width: '25ch' },}}>
          <TextField id="outlined-basic" label="RUT (ID)" size="small"
            type="text"
            placeholder="RUT (ID)"
            value={formData.rut}
            onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
          />
          <TextField id="outlined-basic" label="Nombre de Usuario" size="small" 
          type="text"
          placeholder="Nombre de Usuario"
          value={formData.nombre_usuario}
          onChange={(e) => setFormData({ ...formData, nombre_usuario: e.target.value })}
          />
          <TextField id="outlined-basic" label="Contraseña" size="small"
          type="password"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
          />
          <TextField id="outlined-basic" label="Correo Electrónico" size="small"
            type="text"
            placeholder="Correo Electrónico"
            value={formData.Correo_Electronico}
            onChange={(e) => setFormData({ ...formData, Correo_Electronico: e.target.value })}
          />
          <TextField id="outlined-basic" label="Nombre Completo" size="small"
            type="text"
            placeholder="Nombre Completo"
            value={formData.Nombre_Completo}
            onChange={(e) => setFormData({ ...formData, Nombre_Completo: e.target.value })}
          />
          <Button variant="contained" color="primary" type="submit">{editing ? 'Editar' : 'Crear'}</Button>
        </Box>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.rut}>
            <div>
              RUT (ID): {user.rut}<br />
              Nombre de Usuario: {user.nombre_usuario}<br />
              Correo Electrónico: {user.Correo_Electronico}<br />
              Nombre Completo: {user.Nombre_Completo}<br />
              <button onClick={() => handleEdit(user)}>Editar</button>
              <button onClick={() => handleDelete(user.rut)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>


    </div>
  );
}

export default App;
