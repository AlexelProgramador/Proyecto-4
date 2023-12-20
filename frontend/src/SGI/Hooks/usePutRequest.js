import axios from 'axios';

var url = 'https://invenatrioapi-dh5yto3jj-araeris-projects.vercel.app/api/api'

export const putReq = async (link, productoData) => {
  return axios.put(url + link, productoData)
  .then()
  .catch(error => {
    if (error.response && error.response.status === 422){
      alert('Por favor, complete todos los campos.');
    } else{
      console.error('Error en la solicitud:', error);
    }
  });
};