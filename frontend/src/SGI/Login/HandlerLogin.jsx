import axios from 'axios';
var url = 'http://localhost:8000/api'

export const loginCuenta = async (cuentaData) => {
    return axios.post(url + '/login', cuentaData)
      .then(response => response.data)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al Iniciar Sesión: ', error);
      });
};

