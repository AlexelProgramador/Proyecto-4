import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBotiquin } from './HandlerBotiquin';

export const CreateBotiquin = () => {
  const [botiquinData, setBotiquinData] = useState({
    NombreBotiquin: '',
    LugarBotiquin: '',
    InventarioBotiquin: []
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBotiquinData({
      ...botiquinData,
      [e.target.name]: e.target.value
    });
  };

  const handleInsert = async () => {
    createBotiquin(botiquinData)
      .then(response => {
        // Manejar la respuesta si es necesario
        console.log(response.data);
        // Redirigir a la página deseada después de agregar una nueva botiquin
        navigate('/show-botiquin'); // Cambia '/ruta-de-redireccion' con la ruta deseada
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error, botiquinData);
      });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Nombre del Botiquin"
          name="NombreBotiquin"
          value={botiquinData.NombreBotiquin}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Lugar del Botiquin"
          name="LugarBotiquin"
          value={botiquinData.LugarBotiquin}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleInsert}>
          Insertar Datos de Botiquin
        </button>
      </form>
    </div>
  );
};

export default CreateBotiquin;
