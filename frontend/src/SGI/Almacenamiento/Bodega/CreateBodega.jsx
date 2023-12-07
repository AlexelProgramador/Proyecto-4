import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBodega } from './HandlerBodega';
import { FormAlmacenamientoCreate } from '../../Componentes/FormAlmacenamientoCreate';

export const CreateBodega = ({ setModal, fetchData }) => {
  const [bodegaData, setBodegaData] = useState({
    Nombre: '',
    Lugar: '',
    Tipo: 'Bodega',
    Inventario: []
  });

  const navigate = useNavigate();

  useEffect(() => {
      fetchData();
  }, []);


  const handleInsert = async () => {
    createBodega(bodegaData)
      .then(response => {
        // Manejar la respuesta si es necesario
        console.log(response.data);
        fetchData();
        setModal(false);
        // Redirigir a la página deseada después de agregar una nueva bodega
        // navigate('/show-bodega'); // Cambia '/ruta-de-redireccion' con la ruta deseada

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
