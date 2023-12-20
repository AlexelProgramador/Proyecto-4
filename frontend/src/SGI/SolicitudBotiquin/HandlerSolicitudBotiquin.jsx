import axios from 'axios';

var url = 'https://invenatrioapi-dh5yto3jj-araeris-projects.vercel.app/api/api'

export const homeSolicitud = async () => {
  return axios.get(url + '/solicitudes_botiquin')
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

export const createSolicitud = async (solicitudBotiquinData) => {
    return axios.post(url + '/solicitud_botiquin', solicitudBotiquinData)
      .then(response => response.data)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
};

export const showSolicitud = async (id) => {
    return axios.get(url + `/solicitud_botiquin/${id}`)
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