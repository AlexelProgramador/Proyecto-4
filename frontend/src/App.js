import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({});  // Estado para almacenar los datos del formulario

  const handleSubmit = (event) => {
    event.preventDefault();

    // Realiza la solicitud POST a la ruta en tu servidor Flask
    fetch('http://localhost:5000/post_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Especifica que se envían datos en formato JSON
      },
      body: JSON.stringify(formData), // Convierte los datos del formulario a JSON
    })
      .then(response => response.json())
      .then(data => {
        // Maneja la respuesta del servidor, por ejemplo, muestra un mensaje
        console.log(data.message);
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error);
      });
  };

  const handleInputChange = (event) => {
    // Actualiza el estado del formulario cuando cambian los valores de entrada
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="App">
      <h1>Enviar datos a Flask:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="field1"
          placeholder="Campo 1"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="field2"
          placeholder="Campo 2"
          onChange={handleInputChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
