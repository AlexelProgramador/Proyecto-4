import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProducto, homeProducto } from './HandlerProducto';
import { useModal } from '../../Components/Modal';
import TableHomeProducto from '../Componentes/TableHomeProducto';

export const HomeProducto = () => {
  const [productoData, setDataProducto] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const navigate = useNavigate();
    
  const { setModal } = useModal()

  const fetchData = async () => {
    try {
      const response = await homeProducto();
      setDataProducto(response);
    } catch (error) {
        console.error('Error al obtener datos', error);
    } finally{
      setCargandoProductos(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
      fetchData();
      setModal(false);
    } catch (error) {
      console.error('Error al eliminar el elemento', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-producto/${id}`); //Ruta para la edición de producto
  };
    
  const handleShow = (id) => {
    navigate(`/show-producto/${id}`); //Ruta para la edición de producto
  };
  return (
    <div>
      {cargandoProductos ? <p>Cargando Datos</p> :
        <TableHomeProducto 
        productoData={productoData} 
        setModal={setModal} 
        handleShow={handleShow} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete}
        />
      }
    </div>
  );
};

export default HomeProducto;