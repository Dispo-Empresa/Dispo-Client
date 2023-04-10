import axios from "axios"

import { getToken } from "./Getters/lsTokenService"

//---------------------------
// development environment  |
//---------------------------

const URL = {
  Matheus: "https://localhost:7153",
  Arthur: "https://localhost:53120",
  Guilherme: ""
}

const BASE_URL = URL.Matheus  // <--------

export const ENDPOINTS = {

  auth: {
    signIn: "Auth/signin",
    signUp: "Auth/signup"
  },

  account: {
    getAccountIdByEmail: "Accounts/getAccountIdByEmail",
  },

  userAccount: {
    updateUserAccountInfo: "UserAccount/updateUserAccountInfo",
  },

  forgotPassword: {
    sendResetPasswordCode: "ForgotPassword/sendResetPasswordCode",
    emailCodeChecker: "ForgotPassword/emailCodeChecker",
    resetPassword: "ForgotPassword/resetPassword"
  },

  brand: {
    registerBrand: "Brands/registerBrand",
    getBrandNames: "Brands/getBrandNames",
    getAllBrands: "Brands/getAllBrandsInfo",
    getBrandById: "Brands/getBrandById",
  },

  product: {
    registerProduct: "Products/registerProduct",
    getProductNamesWithCode: "Products/getProductNamesWithCode",
    getAllProducts: "Products/getAllProductsInfo",
    getProductById: "Products/getProductById",
  },

  provider: {
    registerProduct: "Providers/registerProvider",
    getAllProvidersInfo: "Providers/getAllProvidersInfo",
    getProviderById: "Providers/getProviderById",
  },
}

export const createAPIEndpoint = (endpoint) => {
  
  let url = BASE_URL + "/api/v1/" + endpoint;
  let jwtToken = getToken();
  
  let configHeader = {
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${jwtToken}` 
    }
  };

  return {
    getAll: () => axios.get(url, configHeader),
    getBy: data => axios.get(url + data, configHeader),
    post: newRecord => axios.post(url, newRecord, configHeader),
    put: (id, updateRecord) => axios.put(`${url}/${id}`, updateRecord, configHeader),
    delete: id => axios.delete(url + id, configHeader)
  }
}