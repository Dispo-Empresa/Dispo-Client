import axios from "axios"

//---------------------------
// development environment  |
//---------------------------

const URL = {
  Matheus: "https://localhost:7153",
  Arthur: "https://localhost:53120",
  Guilherme: ""
}

const BASE_URL = URL.Matheus // <--------

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
  },

  product: {
    registerProduct: "Products/registerProduct",
    getProductNamesWithCode: "Products/getProductNamesWithCode",
    getAllProducts: "Products/getAllProductsInfo",
  },
}

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + "/api/v1/" + endpoint;

  return {
      getAll: () => axios.get(url),
      getBy: data => axios.get(url + data),
      post: newRecord => axios.post(url, newRecord, { headers: { "Content-Type": "application/json" }}),
      put: (id, updateRecord) => axios.put(`${url}/${id}`, updateRecord, { headers: { "Content-Type": "application/json" }}),
      delete: id => axios.delete(url + id)
  }
}