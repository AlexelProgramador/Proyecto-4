import { useState, useEffect } from "react";
import axios from "axios";

const usePostRequest = (url = "") => {
  const [data, setData] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newUrl, setUrl] = useState(url);
  useEffect(() => {
    setIsLoading(false);
  }, [newUrl, data]);

  const execute = async (newData, newUrl) => {
    setData(newData);
    setUrl(newUrl);
    setIsLoading(true);
    try {
      const result = await axios.post(
        `https://backend-7uep9clzd-alexconrons-projects.vercel.app/api/api/${newUrl}`,
        newData
      );
      setResponse(result.data);
      return result.data; // Devuelve la respuesta
    } catch (error) {
      setError(error);
      console.log(error);
      throw error; // Lanza el error para que pueda ser capturado en el componente
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, response };
};

export default usePostRequest;
