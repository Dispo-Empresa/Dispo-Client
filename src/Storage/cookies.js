import Cookies from "universal-cookie"
const cookies = new Cookies();

export const getCookie = (key) => cookies.get(key);

export const setCookie = (key, value, pathUrl) => cookies.set(key, value, { path: pathUrl });

export const removeCookie = (key, pathUrl) => cookies.remove(key, { path: pathUrl });