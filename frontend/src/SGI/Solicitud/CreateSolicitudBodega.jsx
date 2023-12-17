import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormCreateSolicitudBodega } from '../Componentes/FormSolicitudBodegaCreate';
import TableSolicitudProductoSeleccion from '../Componentes/TableSolicitudProductoSeleccion';
import TableSolicitudSelectedItems from '../Componentes/TableSolicitudSelectedItems';
import { postRequest } from '../Hooks/usePostRequest';
import { fetchDatos } from '../Hooks/useFetchRequest';
import Error from '../Maquetado/Error';

export const CreateSolicitudBodega = () => {
  const response = JSON.parse(localStorage.getItem("response"));
  const isBotiquinero = response && response.usuario && response.usuario.includes("Botiquinero");
  const [solicitudData, setSolicitudData] = useState({
    VariableSolicitud: '',
    UnidadSolicitud: '',
    IdBotiquin: '',
    IdBodega: '',
    NombreBotiquinSolicitud: '',
    NombreBodegaSolicitud:'',
    NombreSolicitanteSolicitud: '',
    FechaSolicitud: '',
    ComentarioSolicitud:'',
    InventarioSolicitud: [],
  });
  const [detalleInventarioData, setDetalleInventarioData] = useState({
    IdProducto: '',
    CantidadProducto: '',
    NombreProducto: '',
  });

  const [bodegaData, setBodegaData] = useState([]);
  const [botiquinData, setBotiquinData] = useState([]);
  const [inventarioSolicitud, setInventarioSolicitud] = useState({});
  const [inventarioBodegaData, setInventarioBodegaData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    
    setSolicitudData({
      ...solicitudData,
      [e.target.name]: e.target.value
    });
  };

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
      if (Object.keys(inventarioSolicitud).length === 0) {
        alert('El inventario de la solicitud está vacío. Agrega productos antes de enviar la solicitud.');
        return;
      }
      // Insertar directamente los datos de InventarioSolicitud
      const url = '/solicitud_bodega';
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
      const inputValue = e.target.value;
      const productId = inventarioBodegaData[index].IdProducto;
      const cantidadAsignada = inventarioBodegaData[index].CantidadAsignada;
  
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
  
  // console.log(solicitudData);

  const fetchData = async () => {
    try {
        const urlBod = '/bodegas';
        const urlBot = '/botiquines';
        const responseBodega = await fetchDatos(urlBod);
        const responseBotiquin =await fetchDatos(urlBot);
        setBodegaData(responseBodega);
        setBotiquinData(responseBotiquin);
    } catch (error) {
        console.error('Error al obtener datos', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [inventarioSolicitud]);

  const handleBotiquinChange = (e) => {
    console.log("Selected Botiquin ID:", e.target.value);
    const selectedOIdUbicacionBotiquin = e.target.value;
    const selectedBotiquin = botiquinData.find(option => option._id === selectedOIdUbicacionBotiquin);

    if (selectedBotiquin) {
        setSolicitudData(prevState => ({
            ...prevState,
            NombreBotiquinSolicitud: selectedBotiquin.Nombre,
            IdBotiquin: selectedOIdUbicacionBotiquin
        }));
    }

  };
  const handleBodegaChange = (e) => {
    const selectedOIdUbicacionBodega = e.target.value;
    const selectedBodega = bodegaData.find(option => option._id === selectedOIdUbicacionBodega);

    if (selectedBodega) {
        setSolicitudData(prevState => ({
            ...prevState,
            NombreBodegaSolicitud: selectedBodega.Nombre,
            IdBodega: selectedOIdUbicacionBodega
        }));
        setInventarioBodegaData(selectedBodega ? selectedBodega.Inventario : []);
    }
    
};

// console.log(inventarioBodegaData);

  return (
    <div>
      { isBotiquinero ? (
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Crear solicitud</div>
          <form className='row'>
            <FormCreateSolicitudBodega 
              botiquinData={botiquinData} 
              bodegaData={bodegaData} 
              handleBodegaChange={handleBodegaChange} 
              handleBotiquinChange={handleBotiquinChange}
              solicitudData={solicitudData}
              setSolicitudData={setSolicitudData}
              selectedItems={selectedItems}
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
                Insertar Datos de Solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
      ) :
      (<Error/>)}
    </div>
  );
};

export default CreateSolicitudBodega;