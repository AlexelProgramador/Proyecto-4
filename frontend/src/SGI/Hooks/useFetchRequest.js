import axios from 'axios';

var url = 'https://invenatrioapi-dh5yto3jj-araeris-projects.vercel.app/api/api'

export const fetchDatos = async (link) => {
  return axios.get(url + link)
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};