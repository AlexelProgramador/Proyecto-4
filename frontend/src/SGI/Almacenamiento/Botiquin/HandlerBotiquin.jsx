import axios from 'axios';

var url = 'https://invenatrioapi-dh5yto3jj-araeris-projects.vercel.app/api/api'

export const homeBotiquin = async () => {
  return axios.get(url + '/botiquines')
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

export const createBotiquin = async (botiquinData) => {
    return axios.post(url + '/botiquin', botiquinData)
      .then(response => response.data)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
};

export const showBotiquin = async (id) => {
    return axios.get(url + `/botiquin/${id}`)
    .then(response => response.data.data)
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al mostrar datos: ', error);
    });
};

export const updateBotiquin = async (id, botiquinData) => {
    return axios.put(url + `/botiquin/${id}`, botiquinData)
    .then()
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al actualizar datos: ', error);
    });
};

export const deleteBotiquin = async (id) => {
  return axios.delete(url + `/botiquin/${id}`)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al eliminar datos: ', error);
  });
};