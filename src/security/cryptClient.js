import CryptoJS from "crypto-js";

const secretPass = "XkhZG4fW2t2W";

export function encryptData(text){

    if(!text) return null;

    return CryptoJS.AES.encrypt(text, secretPass).toString();;
};

export  function decryptData(text){

    if(!text) return null;

    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    return bytes.toString(CryptoJS.enc.Utf8);;
};