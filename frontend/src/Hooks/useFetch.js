import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!url) return;
  //   setLoading(true);
  //   axios
  //     .get(`http://127.0.0.1:8000/api/${url}`)
  //     .then((res) => {
  //       setData(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setLoading(false);
  //     });
  // }, [url]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://127.0.0.1:8000/api/${url}`);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, fetchData };
}
