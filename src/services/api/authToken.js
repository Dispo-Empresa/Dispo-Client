import axios from "axios"

import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../data/storage/browser/local"

const setToken = (token) => {
    if (token){
      setLocalStorage("accessToken", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }else{
      removeLocalStorage("token");
      delete axios.defaults.headers.common.Authorization;
    }
  }

const getToken = () => {

  getLocalStorage("accessToken");
}

const removeToken = () => {

  removeLocalStorage("accessToken");
}

const isAuthenticated = () => {
  
  console.log("testge")
  return localStorage.getItem("accessToken") && localStorage.getItem("accessToken") !== "";
}

export { setToken, getToken, removeToken, isAuthenticated };