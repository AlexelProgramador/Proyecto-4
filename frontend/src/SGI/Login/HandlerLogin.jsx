import axios from 'axios';
var url = 'https://invenatrioapi-dh5yto3jj-araeris-projects.vercel.app/api/api'

export const loginCuenta = async (cuentaData) => {
    return axios.post(url + '/login', cuentaData)
      .then(response => response.data)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al Iniciar Sesión: ', error);
      });
};

