import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {TableSolicitudProductoSeleccion} from '../Componentes/TableSolicitudProductoSeleccion';
import {TableSolicitudSelectedItems} from '../Componentes/TableSolicitudSelectedItems';
import {FormCreateSolicitudBotiquin} from '../Componentes/FormSolicitudBotiquinCreate';
import { postRequest } from '../Hooks/usePostRequest';
import { fetchDatos } from '../Hooks/useFetchRequest';

export const CreateSolicitudBotiquin = () => {
  const [solicitudData, setSolicitudData] = useState({
    VariableSolicitud: '',
    UnidadSolicitud: '',
    IdBotiquin: '',
    NombreBotiquinSolicitud: '',
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

  const [botiquinData, setBotiquinData] = useState([]);
  const [inventarioSolicitud, setInventarioSolicitud] = useState({});
  const [inventarioBotiquinData, setInventarioBotiquinData] = useState([]);
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
        const producto = inventarioBotiquinData[itemId];
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
      const url = '/solicitud_botiquin';
      const data = {
        ...solicitudData,
        InventarioSolicitud: solicitudData.InventarioSolicitud.map(productoSeleccionado => ({
          IdProducto: productoSeleccionado.IdProducto,
          NombreProducto: productoSeleccionado.NombreProducto,
          CantidadSolicitud: productoSeleccionado.CantidadSolicitud || 0,
        })),
      }
      const response = await postRequest(url, data);
  
      if (response.status === 200 || response.statusCode === 200) {
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
      const productId = inventarioBotiquinData[index].IdProducto;
  
      // Buscar el producto por IdProducto en el InventarioSolicitud
      const existingProductIndex = updatedInventario.findIndex(item => item.IdProducto === productId);
  
      // Si la cantidad es mayor a 0, actualiza la cantidad; de lo contrario, elimina el elemento
      if (e.target.value > 0) {
        const updatedItem = {
          IdProducto: productId,
          NombreProducto: inventarioBotiquinData[index].NombreProducto,
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
        IdProducto: inventarioBotiquinData[index].IdProducto,
        NombreProducto: inventarioBotiquinData[index].NombreProducto,
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
  
  console.log(solicitudData);
  

  const fetchData = async () => {
    try {
      const urlBot = '/botiquines';
      const responseBotiquin =await fetchDatos(urlBot);
        setBotiquinData(responseBotiquin);
    } catch (error) {
        console.error('Error al obtener datos', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [inventarioSolicitud]);

  const handleBotiquinChange = (e) => {
    const selectedOIdUbicacionBotiquin = e.target.value;
    const selectedBotiquin = botiquinData.find(option => option._id === selectedOIdUbicacionBotiquin);

    if (selectedBotiquin) {
        setSolicitudData(prevState => ({
            ...prevState,
            NombreBotiquinSolicitud: selectedBotiquin.Nombre,
            IdBotiquin: selectedOIdUbicacionBotiquin
        }));
        setInventarioBotiquinData(selectedBotiquin ? selectedBotiquin.Inventario : []);
    }

  };

console.log(inventarioBotiquinData);

  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
          <div className='h5 text-uppercase pb-2'>Crear solicitud</div>
          <form className='row'>
            <FormCreateSolicitudBotiquin
              botiquinData={botiquinData} 
              handleBotiquinChange={handleBotiquinChange}
              solicitudData={solicitudData}
              setSolicitudData={setSolicitudData}
            />
            <div className='col-md-4 pb-4'>
              <div className='form-floating'>
                <input className='form-control'
                  type="text"
                  // placeholder="Variable Solicitud"
                  name="VariableSolicitud"
                  value={solicitudData.VariableSolicitud}
                  onChange={handleInputChange}
                />
                <label htmlFor="Variable Solicitud">Variable Solicitud:</label>
              </div>
            </div>
            <div className='col-md-4 pb-4'>
              <div className='form-floating'>
                <input className='form-control'
                  type="text"
                  // placeholder="Unidad Solicitud"
                  name="UnidadSolicitud"
                  value={solicitudData.UnidadSolicitud}
                  onChange={handleInputChange}
                />
                <label htmlFor="Unidad Solicitud">Unidad Solicitud:</label>
              </div>
            </div>
            <div className='col-md-4 pb-4'>
              <div className='form-floating'>
                <select className='form-select'
                  id="NombreBotiquinSolicitud"
                  name="NombreBotiquinSolicitud"
                  value={solicitudData.NombreBotiquinSolicitud}
                  onChange={handleBotiquinChange}
                >
                  <option value="">
                    Selecciona un Botiquin
                  </option>
                  {botiquinData.map(option => (
                  <option key={option._id} value={option._id}>
                    {option.Nombre}
                  </option>
                  ))}
                </select>
                <label htmlFor="BotiquinSolicitud">Botiquin Solicitante:</label>
              </div>
            </div>
            <div className='col-md-4 pb-4'>
              <div className='form-floating'>
                <input className='form-control'
                  type="text"
                  // placeholder="Nombre Solicitante Solicitud"
                  name="NombreSolicitanteSolicitud"
                  value={solicitudData.NombreSolicitanteSolicitud}
                  onChange={handleInputChange}
                />
                <label htmlFor="NombreSolicitanteSolicitud">Nombre del Solicitante:</label>
              </div>
            </div>
            <div className='col-md-4 pb-4'>
              <div className='form-floating'>
                <input className='form-control'
                  type="date"
                  // placeholder="Fecha Solicitud"
                  name="FechaSolicitud"
                  value={solicitudData.FechaSolicitud}
                  onChange={handleInputChange}
                />
                <label htmlFor="FechaSolicitud">Fecha Solicitud:</label>
              </div>
            </div>
            {/* Mostrar detalles del inventario de la bodega o mensaje si no hay datos */}
            <TableSolicitudProductoSeleccion 
                  inventarioBodegaData={inventarioBotiquinData}
                  handleCheckboxChange={handleCheckboxChange}
            />
            {/* Mostrar elementos seleccionados */}
            <TableSolicitudSelectedItems 
              selectedItems={selectedItems} 
              inventarioBodegaData={inventarioBotiquinData} 
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
    </div>
  );
};

export default CreateSolicitudBotiquin;