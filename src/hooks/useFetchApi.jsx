import { useState, useEffect } from "react";

import { get } from "services/httpMethods";

function useFetch(endpoint, parameters) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await get(endpoint, parameters);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, parameters]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
