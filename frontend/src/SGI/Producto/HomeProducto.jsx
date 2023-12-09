import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { fetchDatos } from '../Hooks/useFetchRequest';
import { useModal } from '../Componentes/Modal';
import TableHomeProducto from '../Componentes/TableHomeProducto';
import { deleteReq } from '../Hooks/useDeleteRequest';

export const HomeProducto = () => {
  const [productoData, setDataProducto] = useState([]);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const navigate = useNavigate();
  const { setModal } = useModal()

  const fetchData = async () => {
    try {
      const url = '/productos';
      const response = await fetchDatos(url);
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
      const url = `/producto/${id}`;
      await deleteReq(url);
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
      {cargandoProductos ? 
        <div class="d-flex justify-content-center" style={{height:'200px'}}>
            <div className='d-flex align-items-center'>
                <div class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
        :
        <TableHomeProducto 
        productoData={productoData} 
        setModal={setModal} 
        handleShow={handleShow} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete}
        fetchData = {fetchData}
        />
      }
    </div>
  );
};

export default HomeProducto;