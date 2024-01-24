import { useState } from "react";
import axios from "axios";

const useDeleteRequest = (url = "") => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (newUrl, data) => {
    setIsLoading(true);
    try {
      const result = await axios.delete(
        // `https://backend-7uep9clzd-alexconrons-projects.vercel.app/api/api/${newUrl}`,
        `http://127.0.0.1:8000/api/${newUrl}`,
        { data }
      );
      setResponse(result.data);
      return result.data; // Devuelve la respuesta
    } catch (error) {
      setError(error);
      throw error; // Lanza el error para que pueda ser capturado en el componente
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, response };
};

export default useDeleteRequest;