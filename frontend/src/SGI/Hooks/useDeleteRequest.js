import axios from 'axios';

var url = 'http://localhost:8000/api'

export const deleteReq = async (link) => {
  return axios.delete(url + link)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al eliminar datos: ', error);
  });
};