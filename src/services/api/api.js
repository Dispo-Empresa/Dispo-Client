import axios from "axios"

import { getToken } from "../../services/api/authToken";

const callApi = async (endpoint, method, data = null) => {
  
  const config = {
    url: "https://localhost:7153/api/v1/" + endpoint,
    method: method,
    data: data
  };

  const apiConfig = axios.create({
    baseURL: "https://localhost:7153/api/v1/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  });
  
  try {
    const response = await apiConfig(config);

    console.log(response);

    if (!response.data) {
      throw new Error(`Data fetch error ${response.status}`);
    }
    
    return response.data;

  } catch (error) {
    console.log(error);
    return error;
  }
};

const callApiSync = (endpoint, method, data = null) => {

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  };

  try {
    const response = axios.get(`https://localhost:7153/api/v1/` + endpoint, config);

    return response;

  } catch (error) {
    console.log(error);
  }
};

export {callApi, callApiSync};