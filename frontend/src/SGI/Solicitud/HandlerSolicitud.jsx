import axios from 'axios';

var url = 'http://localhost:8000/api'

export const homeSolicitud = async () => {
  return axios.get(url + '/solicitudes')
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

export const createSolicitud = async (solicitudData) => {
    return axios.post(url + '/solicitud', solicitudData)
      .then(response => response.data)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
};

export const showSolicitud = async (id) => {
    return axios.get(url + `/solicitud/${id}`)
    .then(response => response.data.data)
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al mostrar datos: ', error);
    });
};

{/* Probablemente estas se tengan que ir pq no las necesitamos
----------------------------------------------------------------
*/}
export const updateSolicitud = async (id, solicitudData) => {
    return axios.put(url + `/solicitud/${id}`, solicitudData)
    .then()
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al actualizar datos: ', error);
    });
};

export const deleteSolicitud = async (id) => {
  return axios.delete(url + `/solicitud/${id}`)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al eliminar datos: ', error);
  });
};
{/* -------------------------------------------------------------- */}