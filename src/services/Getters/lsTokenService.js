import axios from "axios"

export const setToken = (token) => {
    if (token){
      localStorage.setItem('accessToken', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }else{
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
    }
  }

export const getToken = () => localStorage.getItem('accessToken');

export const removeToken = () => localStorage.removeItem('accessToken');

export const isAuthenticated = () => !!this.getToken();