import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loding, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let responce = await fetch(url);
        let result = await responce.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, loding };
};
