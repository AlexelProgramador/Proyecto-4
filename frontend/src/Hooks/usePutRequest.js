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
      console.log(newUrl, newData);
      const response = await axios.put(
        `http://127.0.0.1:8000/api/${newUrl}`,
        newData
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, execute };
};

export default usePutRequest;
