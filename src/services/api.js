import axios from "axios"

import { getToken } from "./authToken";
import { LOCALHOST } from "../data/constants/endpoints";
import { API_RESPONSE } from "./helper";

const BASE_URL = LOCALHOST;
const TIME_OUT = 10000;

const callApi = async (endpoint, method, data = null) => {
  
  const apiConfig = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    }
  });
  
  try {
    const response = await apiConfig({
      url: endpoint,
      method: method,
      data: data
    });

    return API_RESPONSE(
      response.data.data,
      '',
      response.data.message,
      response.data.success,
      response.data.alertType,
      response.status
    );

  } catch (error) {

    if (error.response) {

      return API_RESPONSE(
        error.response.data,
        `${error.name} ${error.message}`,
        error.response.data.message,
        error.response.data.success,
        error.response.data.alertType,
        error.response.status
      );

    } else if (error.request) {

      return API_RESPONSE(
        null,
        "Erro ao receber resposta",
        "Requisição foi feita com sucesso mas nenhuma resposta foi recebida",
        false,
        'error',
        400
      );

    } else {

      return API_RESPONSE(
        null,
        error.name,
        error.message,
        false,
        'error',
        400
      );

    }
  }
};


export { callApi, API_RESPONSE };