import jwt_decode from "jwt-decode";

export const setUserInfo = (userInfo) => localStorage.setItem('accessUserInfo', JSON.stringify(userInfo));

export const getUserInfo = () => localStorage.getItem('accessUserInfo');

export const getUserId = () => jwt_decode(localStorage.getItem('accessToken')).unique_name;

export const removeUserInfo = () => localStorage.removeItem('accessUserInfo');