
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
    changeWarehouse: "accounts/change-warehouse"
  },

  userAccount: {
    updateUserAccountInfo: "user/{id}",
    getAllUserInfo: "user/id={id}",
  },

  products: {
    get: "products/{id}",
    getAll: "products",
    createProduct: "products",
    updateProduct: "products/edit",
    getProductNames: "products/get-names",
    getWithActivePurschaseOrder: "products/get-with-active-pursche-orders",
    getProductsWithSalePrice: "products/get-with-saleprice",
    getPurchaseOrders: "products/getPurchaseOrders" // teste - apagar
  },

  movements: {
    moveProduct: "movements/move"
  },

  manufacturers: {
    getAll: "manufacturers",
    createManufacturer: "manufacturers"
  },

  suppliers: {
    getAll: "suppliers",
    createSupplier: "suppliers"
  },

  warehouses: {
    getWithAdressByUser: "warehouses/get-with-address-by-user",
    getWithAdress: "warehouses/get-with-address",
    create: "warehouses",
    getAll: "warehouses",
  },

  addresses: {
    getFormattedAddresses: "address/get-formatted-addresses"
  },

  batches: {
    getByProduct: "batches/get-by-product/{productId}"
  },

  purchaseorder:{
    createPurchaseOrder: "purchase-orders",
    getByProduct: "purchase-orders/get-by-product/{productId}"
  }
};

export { LOCALHOST, ENDPOINTS };
