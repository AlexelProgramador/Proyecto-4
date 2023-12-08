import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../Hooks/usePostRequest';
import { FormAlmacenamientoCreate } from '../../Componentes/FormAlmacenamientoCreate';

export const CreateBotiquin = () => {
  const [botiquinData, setBotiquinData] = useState({
    Nombre: '',
    Lugar: '',
    Tipo:'Botiquin',
    Inventario: []
  });
  const navigate = useNavigate();

  const handleInsert = async () => {
    const url = '/botiquin';
    postRequest(url, botiquinData)
      .then(data => {
        if (data.status === 201 || data.statusCode === 201) {
          navigate('/show-botiquin');
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
