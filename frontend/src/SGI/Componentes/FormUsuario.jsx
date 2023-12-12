import React, { useState, useEffect } from 'react';
import { fetchDatos } from '../Hooks/useFetchRequest';

export const FormUsuario = ({userData, setUserData, handleInsert}) => {
  const [dataBodega, setDataBodega] = useState([]);
  const [dataBotiquin, setDataBotiquin] = useState([]);

  const fetchDataBodega = async () => {
    try {
      const url ='/bodegas';
      const response = await fetchDatos(url);
      setDataBodega(response);
    } catch (error) {
      console.error('Error al obtener datos', error);
    }
  };

  const handleBodegaChange = (e) => {
    const selectedIdBodega = e.target.value;
    const selectedUbicacion = dataBodega.find(option => option._id === selectedIdBodega);

    if (selectedUbicacion) {
      setUserData(prevState => ({
        ...prevState,
        almacenamiento: selectedIdBodega,
      }));
    }
  };

  const fetchDataBotiquin = async () => {
    try {
      const url ='/botiquines';
      const response = await fetchDatos(url);
      setDataBotiquin(response);
    } catch (error) {
      console.error('Error al obtener datos', error);
    }
  };

  const handleBotiquinChange = (e) => {
    const selectedIdBotiquin = e.target.value;
    const selectedUbicacion = dataBotiquin.find(option => option._id === selectedIdBotiquin);

    if (selectedUbicacion) {
      setUserData(prevState => ({
        ...prevState,
        almacenamiento: selectedIdBotiquin
        ,
      }));
    }
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    fetchDataBodega();
    fetchDataBotiquin();
  }, []);

  // console.log('bodega',dataBodega);
  // console.log('botiquin',dataBotiquin);

  return (
    <div>
      <div style={{maxWidth:'800px'}}>
        <div className='h5 text-uppercase pb-2'>Nuevo Usuario</div>
        <form className='row'>
          <div className='col-md-4 pb-4'>
            <div className='form-floating'>
              <input className='form-control'
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
              /> 
              <label>Nombre:</label>                               
            </div>
          </div>
          <div className='col-md-4 pb-4'>
            <div className='form-floating'>
              <input className='form-control'
                type="text"
                name="apellido"
                value={userData.apellido}
                onChange={handleInputChange}
              />
              <label>Apellido:</label>                                 
            </div>
          </div>
          <div className='col-md-4 pb-4'>
            <div className='form-floating'>
              <input className='form-control'
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
              <label>Contraseña:</label>
            </div>
          </div>
          <div className='row m-0 p-0'>  
            <div className='col pb-4'>
              <div className='form-floating'>
                <select className='form-select'
                  name="rol"
                  value={userData.rol}
                  onChange={handleInputChange}
                >
                  <option value="Sin Informacion">Sin Información</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Bodeguero">Bodeguero</option>
                  <option value="Botiquinero">Botiquinero</option>
                </select>
                <label>Seleccione rol:</label>               
              </div>
            </div>
            { userData.rol === 'Bodeguero' ? (
              <div className='col pb-4'>    
              <div className='form-floating'>
                  <select className='form-select'
                      id="almacenamiento"
                      name="almacenamiento"
                      value={userData.almacenamiento}
                      onChange={handleBodegaChange}
                  >
                      <option value="Defecto">
                      Selecciona una bodega
                      </option>
                      {dataBodega.map(option => (
                      <option key={option._id} value={option._id}>
                          {option.Nombre}
                      </option>
                      ))}
                  </select>
                  <label htmlFor="UbicacionProducto">Ubicación del Producto:</label>
                </div>                
            </div>
            ) : userData.rol === 'Botiquinero' ? (
              <div className='col-md-6 pb-4'>    
              <div className='form-floating'>
                  <select className='form-select'
                      id="almacenamiento"
                      name="almacenamiento"
                      value={userData.almacenamiento}
                      onChange={handleBotiquinChange}
                  >
                      <option value="Defecto">
                      Selecciona una botiquin
                      </option>
                      {dataBotiquin.map(option => (
                      <option key={option._id} value={option._id}>
                          {option.Nombre}
                      </option>
                      ))}
                  </select>
                  <label htmlFor="UbicacionProducto">Ubicación del Producto:</label>
                </div>                
            </div>
            ): null }
          </div>
          <div class="col-12">        
            <button  className="btn btn-primary" type="button" onClick={handleInsert}>
              Crear nuevo usuario
            </button>              
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormUsuario;
