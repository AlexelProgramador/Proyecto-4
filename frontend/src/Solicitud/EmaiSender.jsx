import axios from 'axios';

const enviarCorreo = async (correoDestinatario, contenidoCorreo, asuntoCorreo) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/enviar-correo',
      {
        correo: correoDestinatario, 
        contenido: contenidoCorreo,
        asunto: asuntoCorreo
      },
      {
        headers: {
          'Content-Type': 'application/json' // Especificar que el contenido es JSON
        }
      }
    );

    if (response.data.message === 'Correo electrónico enviado con éxito') {
      console.log('Correo electrónico enviado con éxito');
      return true;
    } else {
      console.error('Error al enviar el correo electrónico:', response.data.message);
      return false;
    }
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    return false;
  }
};

export default enviarCorreo;
