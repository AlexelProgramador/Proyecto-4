import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../Hooks/usePostRequest';
import FormProducto from '../Componentes/FormProductoCreate';

export const CreateProducto = () => {
  const [productoData, setProductoData] = useState({
    Nombre: '',
    Marca: '',
    Descripcion: '',
    Contenedor: 'Sin Información',
    Cantidad: 0,
    CantidadTotal: 0,
    CantidadAsignada: 0,
    ValorUnitario: '',
    Desgloce: [],
    Ubicacion: []
  });
  
  const navigate = useNavigate();

  const handleInsert = async () => {
      const url = '/producto';
      postRequest(url, productoData)
      .then(data => {
        if (data.status === 201 || data.statusCode === 201) {
          navigate('/show-producto');
        }
      })
      .catch(error => {
        console.error('Error al insertar datos: ', error);
      });
  };

  return (
    <div>
      <FormProducto 
        productoData = {productoData} 
        setProductoData ={setProductoData} 
        handleInsert = {handleInsert}
      />
    </div>
  );
};
export default CreateProducto;
