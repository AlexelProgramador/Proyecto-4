import React, { useState } from 'react';
import { FormAlmacenamientoCreate } from '../../Componentes/FormAlmacenamientoCreate';
import { postRequest } from '../../Hooks/usePostRequest';

export const CreateBodega = ({ setModal, fetchData }) => {
  const [bodegaData, setBodegaData] = useState({
    Nombre: '',
    Lugar: '',
    Tipo: 'Bodega',
    Inventario: []
  });

  const handleInsert = async () => {
    const url = '/bodega';
    postRequest(url, bodegaData)
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
  console.log(bodegaData);
  return (
    <div>
      <FormAlmacenamientoCreate almacenamientoData = {bodegaData} setAlmacenamientoData = {setBodegaData} 
        handleInsert = {handleInsert}/>
    </div>
  );
};
export default CreateBodega;
