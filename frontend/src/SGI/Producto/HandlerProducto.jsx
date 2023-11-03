import axios from 'axios';

var url = 'http://localhost:8000/api'
export const createProducto = (productoData) => {
    return axios.post(url + '/producto', productoData)
      .then(response => response.data)
      .catch(error => {
        // Manejar el error si ocurre
        console.error('Error al insertar datos: ', error);
      });
};

export const showProducto = async (id) => {
    return axios.get(url + `/producto/${id}`)
    .then(response => response.data.data)
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al mostrar datos: ', error);
    });
};

export const updateProducto = async (id, productoData) => {
    return axios.put(url + `/producto/${id}`, productoData)
    .then()
    .catch(error => {
    // Manejar el error si ocurre
    console.error('Error al actualizar datos: ', error);
    });
};