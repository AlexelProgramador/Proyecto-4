import React, { useState } from 'react';
import { postRequest } from '../../Hooks/usePostRequest';
import { FormAlmacenamientoCreate } from '../../Componentes/FormAlmacenamientoCreate';

export const CreateBotiquin = ({ setModal, fetchData }) => {
  const [botiquinData, setBotiquinData] = useState({
    Nombre: '',
    Lugar: '',
    Tipo:'Botiquin',
    Inventario: []
  });

  const handleInsert = async () => {
    const url = '/botiquin';
    postRequest(url, botiquinData)
      .then(data => {
        if (data.status === 201 || data.statusCode === 201) {
          // navigate('/show-botiquin');
          fetchData();
          setModal(false);
        }
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
  };

  return (
    <div>
      <FormAlmacenamientoCreate almacenamientoData = {botiquinData} setAlmacenamientoData = {setBotiquinData} 
        handleInsert = {handleInsert}/>
    </div>
  );
};

export default CreateBotiquin;
