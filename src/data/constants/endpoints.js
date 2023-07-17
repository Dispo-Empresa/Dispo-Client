
const LOCALHOST = "https://localhost:7153/api/v1/";

const ENDPOINTS = {

  teste: {
    getAll: "teste/getAll",
    getId: "teste/{id}",
    getParameters: "teste/id={id}&outroParametro={outroParametro}",
    getPost: "teste",
    getPut: "teste/{id}",
    getRemove: "teste/{id}",
  },

  auth: {
    signIn: "auth/signin",
    signUp: "auth/signup"
  },
  
  forgotPassword: {
    sendEmailCodeResetPassword: "forgot-password/send-recovery-token",
    verifyEmailCode: "forgot-password/validate-recovery-token",
    resetPassword: "forgot-password/reset-password"
  },

  accounts: {
    getAccountIdByEmail: "accounts/get-id",
  },

  userAccount: {
    updateUserAccountInfo: "user-account/{id}",
    getAllUserInfo: "user-account/id={id}",
  },

  products: {
    get: "products/get/{id}",
    getAll: "products/getAll",
    createProduct: "products/create",
    getProductNamesWithCode: "products/get-names-with-code",
  },

  movementations: {
    moveProduct: "products/move"
  }
};

export { LOCALHOST, ENDPOINTS };
