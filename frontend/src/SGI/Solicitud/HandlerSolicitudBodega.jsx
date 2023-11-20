import axios from 'axios';

var url = 'http://localhost:8000/api'

export const homeSolicitud = async () => {
  return axios.get(url + '/solicitudes_bodega')
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

export const createSolicitud = async (solicitudBodegaData) => {
    return axios.post(url + '/solicitud_bodega', solicitudBodegaData)
      .then(response => response.data)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
};

export const showSolicitud = async (id) => {
    return axios.get(url + `/solicitud_bodega/${id}`)
    .then(response => response.data.data)
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al mostrar datos: ', error);
    });
};

export const aceptarSolicitud = async (id, solicitudData) => {
  return axios.put(url + `/solicitud_bodega/${id}/aceptar`, solicitudData)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al actualizar datos: ', error);
  });
};

export const rechazarSolicitud = async (id, solicitudData) => {
  return axios.put(url + `/solicitud_bodega/${id}/rechazar`, solicitudData)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al actualizar datos: ', error);
  });
};

export const contadorSolicitudPendiente = async () => {
  return axios.get(url + '/solicitudes_bodega/contar')
    .then(response => response.data.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

{/* Probablemente estas se tengan que ir pq no las necesitamos
----------------------------------------------------------------
*/}
export const updateSolicitud = async (id, solicitudData) => {
    return axios.put(url + `/solicitud_bodega/${id}`, solicitudData)
    .then()
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al actualizar datos: ', error);
    });
};

export const deleteSolicitud = async (id) => {
  return axios.delete(url + `/solicitud_bodega/${id}`)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al eliminar datos: ', error);
  });
};
{/* -------------------------------------------------------------- */}