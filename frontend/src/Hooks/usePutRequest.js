import { useState } from "react";
import axios from "axios";

const usePutRequest = (initialUrl = "", initialData = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(initialUrl);

  const execute = async (newUrl = url, newData = initialData) => {
    setUrl(newUrl);
    setIsLoading(true);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/${newUrl}`,
        newData
      );
      console.log(response.data); // Imprimir la respuesta del servidor
      setData(response.data);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default usePutRequest;
