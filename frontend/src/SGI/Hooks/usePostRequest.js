import axios from 'axios';

var url = 'http://localhost:8000/api'

export const postRequest = async (link, Data) => {
  return axios.post(url + link, Data)
    .then(response => response.data)
    .catch(error => {
      if (error.response && error.response.status === 422){
        alert('Por favor, complete todos los campos.');
      } else{
        console.error('Error en la solicitud:', error);
      }
    });
};