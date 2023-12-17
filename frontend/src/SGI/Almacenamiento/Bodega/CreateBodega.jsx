import React, { useState } from 'react';
import { FormAlmacenamientoCreate } from '../../Componentes/FormAlmacenamientoCreate';
import { postRequest } from '../../Hooks/usePostRequest';
import Error from '../../Maquetado/Error';

export const CreateBodega = ({ setModal, fetchData }) => {
  const [bodegaData, setBodegaData] = useState({
    Nombre: '',
    Lugar: '',
    Tipo: 'Bodega',
    Inventario: []
  });
  const response = JSON.parse(localStorage.getItem("response"));
  const isAdmin = response && response.usuario && response.usuario.includes("Administrador");

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
      {isAdmin ?
        <FormAlmacenamientoCreate almacenamientoData = {bodegaData} setAlmacenamientoData = {setBodegaData} 
          handleInsert = {handleInsert}/>
      :
        <Error />
      }
    </div>
  );
};
export default CreateBodega;
