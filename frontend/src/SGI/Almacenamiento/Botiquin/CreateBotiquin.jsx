import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBotiquin } from './HandlerBotiquin';
import { FormAlmacenamientoCreate } from '../../Componentes/FormAlmacenamientoCreate';

export const CreateBotiquin = ({ setModal, fetchData }) => {
  const [botiquinData, setBotiquinData] = useState({
    Nombre: '',
    Lugar: '',
    Tipo:'Botiquin',
    Inventario: []
  });
  const navigate = useNavigate();

  const handleInsert = async () => {
    createBotiquin(botiquinData)
      .then(response => {
        // Manejar la respuesta si es necesario
        console.log(response.data);
        fetchData();
        setModal(false);
        // Redirigir a la página deseada después de agregar una nueva botiquin
        // navigate('/show-botiquin'); // Cambia '/ruta-de-redireccion' con la ruta deseada
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error, botiquinData);
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
