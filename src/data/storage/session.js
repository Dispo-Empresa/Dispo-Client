const getSessionStorage = (key) => sessionStorage.getItem(key);
const setSessionStorage = (key, value) => sessionStorage.setItem(key, value);
const removeSessionStorage = (key) => sessionStorage.removeItem(key);

export { getSessionStorage, setSessionStorage, removeSessionStorage };