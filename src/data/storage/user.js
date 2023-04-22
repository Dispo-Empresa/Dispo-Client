import jwt_decode from "jwt-decode";

import { getLocalStorage, setLocalStorage, removeLocalStorage } from "../../data/storage/browser/local"

const setUserInfo = (userInfo) => {

    setLocalStorage('accessUserInfo', JSON.stringify(userInfo));
};

const getUserInfo = () => {

    return getLocalStorage('accessUserInfo');
}

const getUserId = () => {

    return jwt_decode(getLocalStorage('accessToken')).unique_name;
}

const removeUserInfo = () => {

    removeLocalStorage('accessUserInfo');
}

export { setUserInfo, getUserInfo, getUserId, removeUserInfo };