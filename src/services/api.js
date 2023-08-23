import axios from "axios"

import { getToken } from "./authToken";
import { LOCALHOST } from "../utils/constants/endpoints";
import { API_RESPONSE } from "./helper";
import { setLocalStorage } from "../data/local";
import { browserStorageKeys } from "../utils/constants/constants";

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
      "",
      response.data.message,
      response.data.success,
      response.data.alertType,
      response.status
    );

  } catch (error) {
    if(error.response.status === 401){
      setLocalStorage(
        browserStorageKeys.LastAccessedUrl,
        window.location.pathname
      );
      window.location.replace("/login/signin");
    }

    if(error.code && error.code === "ERR_NETWORK"){

      window.location.replace("/404");
      //return API_RESPONSE(
      //  null,
      //  "Erro ao conectar com o servidor",
      //  "Verifique sua conexão com a internet ou tente novamente mais tarde",
      //  false,
      //  'error',
      //  400
      //);

    } else if (error.response) {

      var errorMessage = (error.response.data.message != null && error.response.data.message !== "") ? error.response.data.message : error.response.data.title;
      var successMessage = (error.response.data.success != null && error.response.data.success !== "") ? error.response.data.success : error.response.status >= 400 ? false : true;
      var alertTypeMessage = (error.response.data.alertType != null && error.response.data.alertType !== "") ? error.response.data.alertType : error.response.status >= 400 ? "error" : "warning";

      return API_RESPONSE(
        error.response.data,
        `${error.name} ${error.message}`,
        errorMessage,
        successMessage,
        alertTypeMessage,
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