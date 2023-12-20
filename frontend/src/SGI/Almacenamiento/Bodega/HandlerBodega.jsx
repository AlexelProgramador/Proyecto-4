import axios from 'axios';

var url = 'https://invenatrioapi-dh5yto3jj-araeris-projects.vercel.app/api/api'

export const homeBodega = async () => {
  return axios.get(url + '/bodegas')
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

export const createBodega = async (bodegaData) => {
    return axios.post(url + '/bodega', bodegaData)
      .then(response => response.data)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
};

export const showBodega = async (id) => {
    return axios.get(url + `/bodega/${id}`)
    .then(response => response.data.data)
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al mostrar datos: ', error);
    });
};

export const updateBodega = async (id, bodegaData) => {
    return axios.put(url + `/bodega/${id}`, bodegaData)
    .then()
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al actualizar datos: ', error);
    });
};

export const deleteBodega = async (id) => {
  return axios.delete(url + `/bodega/${id}`)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al eliminar datos: ', error);
  });
};