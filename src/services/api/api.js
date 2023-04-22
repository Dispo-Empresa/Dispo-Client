import axios from "axios"

import { getToken } from "./authToken"

const apiConfig = axios.create({
  baseURL: "https://localhost:7153/api/v1/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  }
});

const callApi = async (endpoint, method, data = null) => {
  const config = {
    url: endpoint,
    method: method,
    data: data
  };
  
  try {
    const response = await apiConfig(config);
    
    if (!response.data) {
      throw new Error(`Data fetch error ${response.status}`);
    }
    
    return response.data;

  } catch (error) {
    
    console.error(error);
    throw error;
  }
};

export default callApi;