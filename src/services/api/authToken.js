import axios from "axios"
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../Storage/local"

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

  return !!this.getToken();
}

export { setToken, getToken, removeToken, isAuthenticated };