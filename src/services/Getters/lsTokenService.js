import axios from "axios"
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../Storage/local"

export const setToken = (token) => {
    if (token){
      setLocalStorage("accessToken", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }else{
      removeLocalStorage("token");
      delete axios.defaults.headers.common.Authorization;
    }
  }

export const getToken = () => getLocalStorage("accessToken");

export const removeToken = () => removeLocalStorage("accessToken");

export const isAuthenticated = () => !!this.getToken();