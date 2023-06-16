import Cookies from "universal-cookie"
const cookies = new Cookies();

const getCookie = (key) => cookies.get(key);
const setCookie = (key, value, pathUrl) => cookies.set(key, value, { path: pathUrl });
const removeCookie = (key, pathUrl) => cookies.remove(key, { path: pathUrl });

export { getCookie, setCookie, removeCookie };