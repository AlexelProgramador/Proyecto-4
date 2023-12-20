import axios from 'axios';

var url = 'https://invenatrioapi-dh5yto3jj-araeris-projects.vercel.app/api/api'

export const deleteReq = async (link) => {
  return axios.delete(url + link)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al eliminar datos: ', error);
  });
};