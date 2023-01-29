import axios from "axios"

//---------------------------
// development environment  |
//---------------------------

const URL = {
  Matheus: "https://localhost:7221",
  Arthur: "https://localhost:53120",
  Guilherme: ""
}

const BASE_URL = URL.Matheus // <--------

export const ENDPOINTS = {

  auth: {
    signIn: "auth/signin",
    signUp: "auth/signup"
  },

  account: {
    getAccountIdByEmail: "accounts/getAccountIdByEmail",
  },

  userAccount: {
    updateUserAccountInfo: "userAccount/updateUserAccountInfo",
  },

  forgotPassword: {
    sendResetPasswordCode: "forgotPassword/sendResetPasswordCode",
    emailCodeChecker: "forgotPassword/emailCodeChecker",
    resetPassword: "forgotPassword/resetPassword"
  },

  brand: {
    registerBrand: "brands/registerBrand",
    getBrandNames: "brands/getBrandNames",
    getAllBrands: "brands/getAllBrandsInfo",
  },

  product: {
    registerProduct: "products/registerProduct",
    getProductNamesWithCode: "products/getProductNamesWithCode",
    getAllProducts: "products/getAllProductsInfo",
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