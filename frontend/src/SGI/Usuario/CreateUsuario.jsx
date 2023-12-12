import React, { useState } from 'react';
import { FormUsuario } from '../Componentes/FormUsuario';
import { postRequest } from '../Hooks/usePostRequest';

export const CreateUsuario = ({ setModal, fetchData }) => {
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    password: '',
    rol: [],
    almacenamiento: ''
  });

  const handleInsert = async () => {
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
      <FormUsuario
        userData = {userData} 
        setUserData ={setUserData} 
        handleInsert = {handleInsert}
      />
    </div>
  );
};
export default CreateUsuario;
