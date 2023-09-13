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

const getUserName = () => jwt_decode(getSessionStorage("accessToken")).unique_name;

const getRole = () => jwt_decode(getSessionStorage("accessToken")).role;

const getAccountId = () => jwt_decode(getSessionStorage("accessToken")).accountId;

const getCurrentWarehouseName = () => jwt_decode(getSessionStorage("accessToken")).currentWarehouseName;

const isAuthenticated = () =>{
  if( getSessionStorage("accessToken") && getSessionStorage("accessToken") !== ""){
    try{
      var isValidToken = jwt_decode(getSessionStorage("accessToken"));
      return isValidToken !== null && isValidToken !== undefined;
    } catch {
      return false;
    }
  }else{
    return false;
  }
};

export { setToken, getToken, removeToken, getUserName, getRole, getAccountId, getCurrentWarehouseName, isAuthenticated };