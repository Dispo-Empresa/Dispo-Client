import jwt_decode from "jwt-decode";
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../Storage/local"

export const setUserInfo = (userInfo) => setLocalStorage('accessUserInfo', JSON.stringify(userInfo));

export const getUserInfo = () => getLocalStorage('accessUserInfo');

export const getUserId = () => jwt_decode(getLocalStorage('accessToken')).unique_name;

export const removeUserInfo = () => removeLocalStorage('accessUserInfo');