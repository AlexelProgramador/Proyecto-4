import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSolicitud } from './HandlerSolicitudBodega';
import { homeBodega } from '../Bodega/HandlerBodega';
import { homeBotiquin }  from '../Botiquin/HandlerBotiquin';

export const CreateSolicitudBodega = () => {
  const [solicitudData, setSolicitudData] = useState({
    VariableSolicitud: '',
    UnidadSolicitud: '',
    IdBotiquin: '',
    NombreBotiquinSolicitud: '',
    NombreBodegaSolicitud:'',
    NombreSolicitanteSolicitud: '',
    FechaSolicitud: '',
    ComentarioSolicitud:'',
    InventarioSolicitud: [],
  });

  const [bodegaData, setBodegaData] = useState([]);
  const [botiquinData, setBotiquinData] = useState([]);
  const [inventarioBodegaData, setInventarioBodegaData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    
    setSolicitudData({
      ...solicitudData,
      [e.target.name]: e.target.value
      
    });

    if (e.target.name === 'BodegaSolicitud') {
      const bodegaSeleccionada = bodegaData.find((bodega) => bodega.NombreBodega === e.target.value);
      setInventarioBodegaData(bodegaSeleccionada ? bodegaSeleccionada.InventarioBodega : []);
      
    }
  };

  const handleCheckboxChange = (itemId) => {
    // Alternar la selección del elemento
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        // Desmarcar: Eliminar el elemento de la lista
        setSolicitudData((prevData) => {
          const updatedInventario = prevData.InventarioSolicitud.filter((item, index) => index !== itemId);
          return {
            ...prevData,
            InventarioSolicitud: updatedInventario
          };
        });
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        // Marcar: Añadir el elemento a la lista
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleInsert = async () => {
    // Aquí puedes utilizar los elementos seleccionados según necesites
    const selectedItemsData = inventarioBodegaData.filter((item, index) => selectedItems.includes(index));

    // Agregar lógica para manejar los elementos seleccionados
    createSolicitud({
      ...solicitudData,
      InventarioSolicitud: selectedItemsData,
    })
      .then(response => {
        // Manejar la respuesta si es necesario
        console.log(response.data);
        // Redirigir a la página deseada después de agregar una nueva solicitud
        navigate('/show-solicitud'); // Cambia '/ruta-de-redireccion' con la ruta deseada
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error, solicitudData);
      });
  };

  const handleInventarioChange = (index, cantidad) => {
    setSolicitudData((prevData) => {
      const updatedInventario = [...prevData.InventarioSolicitud];
      
      // Si la cantidad es mayor a 0, actualiza la cantidad; de lo contrario, elimina el elemento
      if (cantidad > 0) {
        const updatedItem = {
          ...updatedInventario[index],
          CantidadSolicitud: cantidad
        };
        updatedInventario[index] = updatedItem;
      } else {
        updatedInventario.splice(index, 1);
      }
  
      return {
        ...prevData,
        InventarioSolicitud: updatedInventario
      };
    });
  
    // Añadir o quitar el índice según si la cantidad es mayor a 0
    setSelectedItems((prevSelectedItems) => {
      if (cantidad > 0) {
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
        const responseBodega = await homeBodega();
        const responseBotiquin =await homeBotiquin();
        setBodegaData(responseBodega);
        setBotiquinData(responseBotiquin);
    } catch (error) {
        console.error('Error al obtener datos', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBotiquinChange = (e) => {
    const selectedOIdUbicacionBotiquin = e.target.value;
    const selectedBotiquin = botiquinData.find(option => option._id === selectedOIdUbicacionBotiquin);

    if (selectedBotiquin) {
        setSolicitudData(prevState => ({
            ...prevState,
            NombreBotiquinSolicitud: selectedBotiquin.NombreBotiquin,
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
            NombreBodegaSolicitud: selectedBodega.NombreBodega,
            IdBodega: selectedOIdUbicacionBodega
        }));
        setInventarioBodegaData(selectedBodega ? selectedBodega.InventarioBodega : []);
    }
    
};
  console.log(solicitudData);


  return (
    <div>
      <form>
        <div>
          <label htmlFor="Variable Solicitud">Variable Solicitud:</label>
        <input
          type="text"
          placeholder="Variable Solicitud"
          name="VariableSolicitud"
          value={solicitudData.VariableSolicitud}
          onChange={handleInputChange}
        />
        </div>

        <div>
          <label htmlFor="Unidad Solicitud">Unidad Solicitud:</label>
          <input
            type="text"
            placeholder="Unidad Solicitud"
            name="UnidadSolicitud"
            value={solicitudData.UnidadSolicitud}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          <label htmlFor="BotiquinSolicitud">Botiquin Solicitante:</label>
          <select
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
                {option.NombreBotiquin}
              </option>
            ))}
          </select>

        </div>

        <div>
          <label htmlFor="NombreSolicitanteSolicitud">Nombre del Solicitante:</label>
          <input
            type="text"
            placeholder="Nombre Solicitante Solicitud"
            name="NombreSolicitanteSolicitud"
            value={solicitudData.NombreSolicitanteSolicitud}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
        <label htmlFor="FechaSolicitud">Fecha Solicitud:</label>
        <input
          type="date"
          placeholder="Fecha Solicitud"
          name="FechaSolicitud"
          value={solicitudData.FechaSolicitud}
          onChange={handleInputChange}
        />
        </div>
        
        <div>
          <label htmlFor="BodegaSolicitud">Bodega a Seleccionar:</label>
          <select
            id="NombreBodegaSolicitud"
            name="NombreBodegaSolicitud"
            value={solicitudData.NombreBodegaSolicitud}
            onChange={handleBodegaChange}
            disabled={selectedItems.length > 0}
          >
            <option value="">
              Selecciona una bodega
            </option>
            {bodegaData.map(option => (
              <option key={option._id} value={option._id}>
                {option.NombreBodega}
              </option>
            ))}
          </select>
        </div>
        

        {/* Mostrar detalles del inventario de la bodega o mensaje si no hay datos */}
        {inventarioBodegaData.length > 0 ? (
          <div>
            <h3>Detalles del Inventario</h3>
            <table>
              <thead>
                <tr>
                  <th>Seleccionar</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {inventarioBodegaData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td>{item.NombreProducto}</td>
                    <td>{item.CantidadAsignadaProducto}</td>
                    <td>{item.FechaProcesoProducto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay datos en el inventario de la bodega seleccionada.</p>
        )}

        {/* Mostrar elementos seleccionados */}
        {selectedItems.length > 0 && (
          <div>
            <h3>Objetos Seleccionados</h3>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad Actual</th>
                  <th>Número de Inventario a Pedir</th>
                </tr>
              </thead>
              <tbody>
                {selectedItems.map((index) => (
                  <tr key={index}>
                  <td>{inventarioBodegaData[index].NombreProducto}</td>
                  <td>{inventarioBodegaData[index].CantidadAsignadaProducto}</td>
                  <td>
                    <input
                      type="number"
                      value={solicitudData.InventarioSolicitud[index]?.CantidadSolicitud || 0}
                      onChange={(e) => handleInventarioChange(index, e.target.value)}
                    />
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
        </div>
      )}

        <button type="button" onClick={handleInsert}>
          Insertar Datos de Solicitud
        </button>
      </form>
    </div>
  );
};

export default CreateSolicitudBodega;
