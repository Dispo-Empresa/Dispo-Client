
const LOCALHOST = "https://localhost:7153/api/v1/";

const ENDPOINTS = {

  auth: {
    signIn: "auth/signin",
    signUp: "auth/signup"
  },

  adm: {
    getRoles: "adm/getRoles",
    createEmployee: "adm/createEmployee",
    employees: "adm/employees"
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
    getAll: "products",
    createProduct: "products/create",
    getProductNamesWithCode: "products/get-names-with-code",
  },

  movements: {
    moveProduct: "products/move"
  }
};

export { LOCALHOST, ENDPOINTS };
