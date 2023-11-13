import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSolicitud } from './HandlerSolicitudBodega';
import { homeBodega } from '../Bodega/HandlerBodega';

export const CreateSolicitudBodega = () => {
  const [solicitudData, setSolicitudData] = useState({
    VariableSolicitud: '',
    UnidadSolicitud: '',
    BotiquinSolicitud: 0,
    BodegaSolicitud:'Defecto',
    NombreSolicitanteSolicitud: '',
    FechaSolicitud: '',
    InventarioSolicitud: [],
  });

  const [bodegaData, setBodegaData] = useState([]);
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
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
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
      const updatedItem = {
        ...updatedInventario[index],
        CantidadSolicitud: cantidad
      };
      updatedInventario[index] = updatedItem;
  
      return {
        ...prevData,
        InventarioSolicitud: updatedInventario
      };
    });
    console.log(solicitudData);
  };

  const fetchData = async () => {
    try {
        const response = await homeBodega();
        setBodegaData(response);
    } catch (error) {
        console.error('Error al obtener datos', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Variable Solicitud"
          name="VariableSolicitud"
          value={solicitudData.VariableSolicitud}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Unidad Solicitud"
          name="UnidadSolicitud"
          value={solicitudData.UnidadSolicitud}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Botiquin Solicitud"
          name="BotiquinSolicitud"
          value={solicitudData.BotiquinSolicitud}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Nombre Solicitante Solicitud"
          name="NombreSolicitanteSolicitud"
          value={solicitudData.NombreSolicitanteSolicitud}
          onChange={handleInputChange}
        />

        <input
          type="date"
          placeholder="Fecha Solicitud"
          name="FechaSolicitud"
          value={solicitudData.FechaSolicitud}
          onChange={handleInputChange}
        />

        <select
          id="BodegaSolicitud"
          name="BodegaSolicitud"
          value={solicitudData.BodegaSolicitud}
          onChange={handleInputChange}
          disabled={selectedItems.length > 0}
        >
          <option value="">
            Selecciona una bodega
          </option>
          {bodegaData.map(option => (
            <option key={option._id} value={option.NombreBodega}>
              {option.NombreBodega}
            </option>
          ))}
        </select>

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
