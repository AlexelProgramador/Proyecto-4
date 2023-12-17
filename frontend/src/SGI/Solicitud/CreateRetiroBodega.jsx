import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableSolicitudProductoSeleccion} from '../Componentes/TableSolicitudProductoSeleccion';
import { TableSolicitudSelectedItems} from '../Componentes/TableSolicitudSelectedItems';
import { postRequest } from '../Hooks/usePostRequest';
import { fetchDatos } from '../Hooks/useFetchRequest';
import FormCreateRetiroBodega from '../Componentes/FormRetiroBodegaCreate';
import Error from '../Maquetado/Error';

export const CreateRetiroBodega = () => {
  const [solicitudData, setSolicitudData] = useState({
    IdBodega: '',
    NombreBodegaSolicitud: '',
    NombreSolicitanteSolicitud: '',
    FechaSolicitud: '',
    ComentarioSolicitud:'',
    InventarioSolicitud: [],
  });
  const response = JSON.parse(localStorage.getItem("response"));
  const isBodeguero = response && response.usuario && response.usuario.includes("Bodeguero");
  const [detalleInventarioData, setDetalleInventarioData] = useState({
    IdProducto: '',
    CantidadProducto: '',
    NombreProducto: '',
  });

  const [bodegaData, setBodegaData] = useState([]);
  const [inventarioSolicitud, setInventarioSolicitud] = useState({});
  const [inventarioBodegaData, setInventarioBodegaData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  
  const handleCheckboxChange = (itemId) => {
    // Alternar la selección del elemento
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        // Desmarcar: Eliminar el elemento del inventario
        const { [itemId]: _, ...updatedInventario } = inventarioSolicitud;
        setInventarioSolicitud(updatedInventario);
        // Eliminar el detalle del inventario correspondiente
        const { [itemId]: __, ...updatedDetalleInventario } = detalleInventarioData;
        setDetalleInventarioData(updatedDetalleInventario);
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        // Marcar: Añadir el elemento al inventario
        const producto = inventarioBodegaData[itemId];
        setInventarioSolicitud((prevInventario) => ({
          ...prevInventario,
          [producto.IdProducto]: {
            IdProducto: producto.IdProducto,
            NombreProducto: producto.NombreProducto,
            CantidadSolicitud: '',  // Inicializar la cantidad en 0
          },
        }));
        // Inicializar el detalle del inventario correspondiente
        setDetalleInventarioData((prevDetalle) => ({
          ...prevDetalle,
          [itemId]: {
            IdProducto: producto.IdProducto,
            NombreProducto: producto.NombreProducto,
            CantidadProducto: '',
          },
        }));
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleInsert = async () => {
    try {
      // Insertar directamente los datos de InventarioSolicitud
      const url = '/solicitud_bodega/retiro';
      const data = {
        ...solicitudData,
        InventarioSolicitud: solicitudData.InventarioSolicitud.map(productoSeleccionado => ({
          IdProducto: productoSeleccionado.IdProducto,
          NombreProducto: productoSeleccionado.NombreProducto,
          CantidadSolicitud: productoSeleccionado.CantidadSolicitud || 0,
        })),
      }
      const response = await postRequest(url, data);
  
      if (response.status === 201 || response.statusCode === 201) {
        navigate('/show-solicitud');
    }
    } catch (error) {
      // Manejar el error si ocurre
      console.error('Error al insertar datos: ', error, solicitudData);
    }
  };

  const handleInventarioChange = (e, index) => {
    setSolicitudData((prevData) => {
      const updatedInventario = [...prevData.InventarioSolicitud];
      const productId = inventarioBodegaData[index].IdProducto;
  
      // Buscar el producto por IdProducto en el InventarioSolicitud
      const existingProductIndex = updatedInventario.findIndex(item => item.IdProducto === productId);
  
      // Si la cantidad es mayor a 0, actualiza la cantidad; de lo contrario, elimina el elemento
      if (e.target.value > 0) {
        const updatedItem = {
          IdProducto: productId,
          NombreProducto: inventarioBodegaData[index].NombreProducto,
          CantidadSolicitud: e.target.value
        };
  
        if (existingProductIndex !== -1) {
          // Si el producto ya existe, actualiza la cantidad
          updatedInventario[existingProductIndex] = updatedItem;
        } else {
          // Si el producto no existe, agréguelo al final del arreglo
          updatedInventario.push(updatedItem);
        }
      } else {
        // Si la cantidad es 0 o menor, elimina el elemento si existe
        if (existingProductIndex !== -1) {
          updatedInventario.splice(existingProductIndex, 1);
        }
      }
  
      return {
        ...prevData,
        InventarioSolicitud: updatedInventario
      };
    });
  
    // Actualizar el detalle del inventario correspondiente
    setDetalleInventarioData((prevDetalle) => ({
      ...prevDetalle,
      [index]: {
        IdProducto: inventarioBodegaData[index].IdProducto,
        NombreProducto: inventarioBodegaData[index].NombreProducto,
        CantidadProducto: e.target.value,
      },
    }));
  
    // Añadir o quitar el índice según si la cantidad es mayor a 0
    setSelectedItems((prevSelectedItems) => {
      if (e.target.value > 0) {
        if (!prevSelectedItems.includes(index)) {
          return [...prevSelectedItems, index];
        }
      } else {
        return prevSelectedItems.filter((id) => id !== index);
      }
      return prevSelectedItems;
    });
  };
  
  const fetchData = async () => {
    try {
      const urlBod = '/bodegas';
      const responseBodega =await fetchDatos(urlBod);
        setBodegaData(responseBodega);
    } catch (error) {
        console.error('Error al obtener datos', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [inventarioSolicitud, solicitudData]);

  const handleBodegaChange = (e) => {
    const selectedOIdUbicacionBodega = e.target.value;
    const selectedBodega = bodegaData.find(option => option._id === selectedOIdUbicacionBodega);

    if (selectedBodega) {
        console.log(selectedBodega);
        setSolicitudData(prevState => ({
            ...prevState,
            NombreBodegaSolicitud: selectedBodega.Nombre,
            IdBodega: selectedOIdUbicacionBodega
        }));
        setInventarioBodegaData(selectedBodega ? selectedBodega.Inventario : []);
    }

  };

  return (
    <div>
      { isBodeguero ? (
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Crear solicitud de retiro</div>
          <form className='row'>
            <FormCreateRetiroBodega
              bodegaData={bodegaData} 
              handleBodegaChange={handleBodegaChange}
              solicitudData={solicitudData}
              setSolicitudData={setSolicitudData}
            />
            {/* Mostrar detalles del inventario de la bodega o mensaje si no hay datos */}
            <TableSolicitudProductoSeleccion 
                  inventarioBodegaData={inventarioBodegaData}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedItems={selectedItems}
            />
            {/* Mostrar elementos seleccionados */}
            <TableSolicitudSelectedItems 
              selectedItems={selectedItems} 
              inventarioBodegaData={inventarioBodegaData} 
              handleInventarioChange={handleInventarioChange}
              detalleInventarioData={detalleInventarioData}
            />
            <div className='col'>
              <button className='btn btn-primary' type="button" onClick={handleInsert}>
                Retirar productos
              </button>
            </div>
          </form>
        </div>
      </div>
      ) : (
        <Error/>
      )
      }
    </div>
  );
};

export default CreateRetiroBodega;