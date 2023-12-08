import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProducto } from './HandlerProducto';
import FormProducto from '../Componentes/FormProductoCreate';

export const CreateProducto = ({ setModal, fetchData }) => {
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
    createProducto(productoData)
      .then(data => {
        console.log(data);
        fetchData();
        setModal(false);
        // navigate('/show-producto');
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
