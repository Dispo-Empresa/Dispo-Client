import axios from "axios"
import jwt_decode from "jwt-decode";

import { getSessionStorage, setSessionStorage, removeSessionStorage } from "../data/session";

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

const removeToken = () => removeSessionStorage("accessToken");

const getRole = () => jwt_decode(getSessionStorage("accessToken")).role;

const getAccountId = () => jwt_decode(getSessionStorage("accessToken")).accountId;

const isAuthenticated = () => sessionStorage.getItem("accessToken") && sessionStorage.getItem("accessToken") !== "";

export { setToken, getToken, removeToken, getRole, getAccountId, isAuthenticated };