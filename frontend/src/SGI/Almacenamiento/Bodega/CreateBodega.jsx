import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormAlmacenamientoCreate } from '../../Componentes/FormAlmacenamientoCreate';
import { postRequest } from '../../Hooks/usePostRequest';

export const CreateBodega = () => {
  const [bodegaData, setBodegaData] = useState({
    Nombre: '',
    Lugar: '',
    Tipo: 'Bodega',
    Inventario: []
  });
  const navigate = useNavigate();
  
  const handleInsert = async () => {
    const url = '/bodega';
    postRequest(url, bodegaData)
      .then(data => {
        if (data.status === 201 || data.statusCode === 201) {
          navigate('/show-bodega');
        }
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
  };
  console.log(bodegaData);
  return (
    <div>
      <FormAlmacenamientoCreate almacenamientoData = {bodegaData} setAlmacenamientoData = {setBodegaData} 
       handleInsert = {handleInsert}/>
    </div>
  );
};
export default CreateBodega;
