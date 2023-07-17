import axios from "axios";
import { useState, useEffect } from "react";

import { getToken } from "../services/authToken";
import { LOCALHOST } from "../data/constants/endpoints";
import { API_RESPONSE, joinParameters } from "./helper";

function useFetch(endpoint, parameters) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  };

  endpoint = joinParameters(endpoint, parameters);

  useEffect(() => {
    axios
      .get(LOCALHOST + endpoint, config)
      .then((response) => {
        setData(
          API_RESPONSE(
            response.data.data,
            "",
            response.data.message,
            response.data.success,
            response.data.alertType,
            response.status
          )
        );
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
