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
      // Insertar directamente los datos de InventarioSolicitud
      const response = await createSolicitud({
        ...solicitudData,
        InventarioSolicitud: solicitudData.InventarioSolicitud.map(productoSeleccionado => ({
          IdProducto: productoSeleccionado.IdProducto,
          NombreProducto: productoSeleccionado.NombreProducto,
          CantidadSolicitud: productoSeleccionado.CantidadSolicitud || 0,
        })),
      });
  
      // Manejar la respuesta si es necesario
      console.log(response.data);
      
      // Redirigir a la página deseada después de agregar una nueva solicitud
      navigate('/show-solicitud'); // Cambia '/ruta-de-redireccion' con la ruta deseada
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
  
  console.log(solicitudData);
  

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
  }, [inventarioSolicitud]);

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


  return (
    <div>
      <div className='card shadow-card rounded-0 border border-0'>
        <div className='card-body'>
            <div className='h5 text-uppercase pb-2'>Crear solicitud</div>
            <form className='row'>
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
                      {option.NombreBotiquin}
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
              <div className='col-md-4 pb-4'>
                <div className='form-floating'>
                  <select className='form-select'
                    id="NombreBodegaSolicitud"
                    name="NombreBodegaSolicitud"
                    value={solicitudData.NombreBodegaSolicitud}
                    onChange={handleBodegaChange}
                    disabled={selectedItems.length > 0}
                  >
                    <option value=''>
                      Selecciona una bodega
                    </option>
                    {bodegaData.map(option => (
                      <option key={option._id} value={option._id}>
                        {option.NombreBodega}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="BodegaSolicitud">Bodega a Seleccionar:</label>
                </div>
              </div>
            

            {/* Mostrar detalles del inventario de la bodega o mensaje si no hay datos */}
            {inventarioBodegaData.length > 0 ? (
              <div>
                <div className='h5 text-uppercase pb-2'>Detalles del Inventario</div>
                <div className='table-responsive'>
                  <table className='table'>
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
                            <input className='form-check-input'
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
              </div>
            ) : (
              <p>No hay datos en el inventario de la bodega seleccionada.</p>
            )}

            {/* Mostrar elementos seleccionados */}
            {selectedItems.length > 0 && (
              <div>
                <div className='h5 text-uppercase pb-2'>Objetos seleccionados</div>
                <div className='table-responsive'>
                  <table className='table'>
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
                        <input className='form-control form-control-sm'
                          type="text"
                          id="CantidadProducto"
                          name="CantidadProducto"
                          value={detalleInventarioData[index]?.CantidadProducto || ''}
                          onChange={(e) => handleInventarioChange(e, index)}
                          pattern="\d*" // Asegura que solo se ingresen números
                          title="Ingresa solo números"
                        />
                        </td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          )}

            <button className='btn btn-primary' type="button" onClick={handleInsert}>
              Insertar Datos de Solicitud
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSolicitudBodega;