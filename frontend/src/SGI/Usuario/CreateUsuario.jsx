import React, { useState } from 'react';
import { FormUsuario } from '../Componentes/FormUsuario';
import { postRequest } from '../Hooks/usePostRequest';
import Error from '../Maquetado/Error';

export const CreateUsuario = ({ setModal, fetchData }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    password: '',
    rol: [],
    almacenamiento: ''
  });
  const response = JSON.parse(localStorage.getItem("response"));
  const isAdmin = response && response.usuario && response.usuario.includes("Administrador");

  const [passwordError, setPasswordError] = useState(null);

  const isPasswordValid = (password) => {
    // Puedes personalizar estas condiciones según tus requisitos
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleInsert = async () => {
    if (!isPasswordValid(userData.password)) {
      setPasswordError('La contraseña debe contener al menos una mayúscula, un número y un carácter especial.');
      return;
    }
    
    const url = '/usuario';
    postRequest(url, userData)
      .then(data => {
        if (data.status === 201 || data.statusCode === 201) {
          fetchData();
          setModal(false);
        }
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
  };
  // console.log(userData);
  return (
    <div>
      {isAdmin ? (
      <FormUsuario
        userData = {userData} 
        setUserData ={setUserData} 
        handleInsert = {handleInsert}
        passwordError = {passwordError}
        setPasswordError = {setPasswordError}
      />
      ) : (
        <Error/>
      )
      }
    </div>
  );
};
export default CreateUsuario;
