const getLocalStorage = (key) => localStorage.getItem(key);
const setLocalStorage = (key, value) => localStorage.setItem(key, value);
const removeLocalStorage = (key) => localStorage.removeItem(key);

export { getLocalStorage, setLocalStorage, removeLocalStorage };