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
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Nueva Bodega</div>
          <form className='row'>
              <div className='col-md-6 pb-4'>
                <div className='form-floating'>
                <input className='form-control'
                  type="text"
                  // placeholder="Nombre del Botiquin"
                  name="NombreBotiquin"
                  value={botiquinData.NombreBotiquin}
                  onChange={handleInputChange}
                />
                <label>Nombre:</label>
              </div>
            </div>            
            <div className='col-md-6 pb-4'>
                <div className='form-floating'>
                <input className='form-control'
                  type="text"
                  // placeholder="Lugar del Botiquin"
                  name="LugarBotiquin"
                  value={botiquinData.LugarBotiquin}
                  onChange={handleInputChange}
                />
                <label>Lugar:</label>
              </div>
            </div>
            <div class="col-12">        
                <button className='btn btn-primary' type="button" onClick={handleInsert}>
                Insertar Datos de Botiquin
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBotiquin;
