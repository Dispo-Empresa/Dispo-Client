import axios from "axios"

import { getSessionStorage, setSessionStorage, removeSessionStorage } from "../../data/storage/session";

const setToken = (token) => {
  if (token){
    setSessionStorage("accessToken", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }else{
    removeSessionStorage("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
}

const getToken = () => getSessionStorage("accessToken");

const removeToken = () => {
  removeSessionStorage("accessToken");
}

const isAuthenticated = () => {
return sessionStorage.getItem("accessToken") && sessionStorage.getItem("accessToken") !== "";
}

export { setToken, getToken, removeToken, isAuthenticated };