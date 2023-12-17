import axios from "axios"
import jwt_decode from "jwt-decode";

import { getCookie, setCookie, removeCookie } from "data/cookies";

const setToken = (token) => {
  if (token){
    setCookie("accessToken", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }else{
    removeCookie("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
}

const getToken = () => getCookie("accessToken");

const removeToken = () => removeCookie("accessToken");

const getUserName = () => jwt_decode(getCookie("accessToken")).unique_name;

const getRole = () => jwt_decode(getCookie("accessToken")).role;

const getAccountId = () => jwt_decode(getCookie("accessToken")).accountId;

const getCurrentWarehouseName = () => jwt_decode(getCookie("accessToken")).currentWarehouseName;

const isAuthenticated = () =>{
  if( getCookie("accessToken") && getCookie("accessToken") !== ""){
    try{
      var isValidToken = jwt_decode(getCookie("accessToken"));
      return isValidToken !== null && isValidToken !== undefined;
    } catch {
      return false;
    }
  }else{
    return false;
  }
};

export { setToken, getToken, removeToken, getUserName, getRole, getAccountId, getCurrentWarehouseName, isAuthenticated };