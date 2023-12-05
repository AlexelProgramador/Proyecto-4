import axios from 'axios';

var url = 'http://localhost:8000/api'

export const homeProducto = async () => {
  return axios.get(url + '/productos')
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

export const createProducto = async (productoData) => {
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

export const updateProductoDesgloce = async (id, desgloceData) => {
  return axios.put(url + `/producto/${id}/desgloce`, desgloceData)
  .then(response => response.data)
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al actualizar desgloce: ', error);
  });
};

export const updateProductoAsignacion = async (id, asignacionData) => {
  return axios.put(url + `/producto/${id}/asignacion`, asignacionData)
  .then(response => {
    const data = response.data;
    if (data.success) {
      console.log(data.message); // Mensaje de depuración
      // Realizar otras acciones según sea necesario
    } else {
      console.error('Error en la operación:', data.message);
      // Manejar el error de alguna manera
    }
    })
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al actualizar asignacion: ', error);
  });
};

export const deleteProducto = async (id) => {
  return axios.delete(url + `/producto/${id}`)
  .then()
  .catch(error => {
  // Manejar el error si ocurre
  console.error('Error al eliminar datos: ', error);
  });
};

export const pocasUnidadesProducto = async () => {
  return axios.get(url + '/productos/sinInventario')
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

export const vencimientoProducto = async () => {
  return axios.get(url + '/productos/vencimientoInventario')
    .then(response => response.data)
    .catch(error => {
      // Manejar el error si ocurre
      console.error('Error al mostrar todos los datos: ', error);
    });
};

