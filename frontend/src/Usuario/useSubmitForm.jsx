import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useSubmitForm = (execute, setShowAlert) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event, nombre, apellido, password, rol) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      // Lógica para la creación de usuarios
      const data = {
        nombre: nombre,
        apellido: apellido,
        password: password,
        rol: [rol], // Puedes ajustar esto según la estructura de tu backend
        // Otros campos necesarios para la creación de usuarios
      };

      const url = "usuario"; // Asegúrate de tener este endpoint en tu backend
      const response = await execute(data, url);

      setIsLoading(false);

      if (response) {
        setShowAlert(true);
        navigate("/misUsuarios"); // Puedes redirigir a la página de usuarios después de la creación exitosa
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return { handleSubmit, isLoading };
};

export default useSubmitForm;
