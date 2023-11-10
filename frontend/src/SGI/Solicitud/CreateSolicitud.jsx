import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSolicitud } from './HandlerSolicitud';
import { showBodega } from '../Bodega/HandlerBodega';

export const CreateSolicitudBodega = () => {
  const [solicitudData, setSolicitudData] = useState({
    VariableSolicitud: '',
    UnidadSolicitud: '',
    BotiquinSolicitud: 0,
    NombreSolicitanteSolicitud: '',
    FechaSolicitud: '',
    InventarioSolicitud: [],
  });

  //const [productoData, setProductoData] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSolicitudData({
      ...solicitudData,
      [e.target.name]: e.target.value
    });
  };

  const handleInsert = async () => {
    createSolicitud(solicitudData)
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

  // const fetchData = async () => {
  //   try {
  //       const response = await showBodega();
  //       setProductoData(response);
  //   } catch (error) {
  //       console.error('Error al obtener datos', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

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


        <button type="button" onClick={handleInsert}>
          Insertar Datos de Solicitud
        </button>
      </form>
    </div>
  );
};

export default CreateSolicitudBodega;
