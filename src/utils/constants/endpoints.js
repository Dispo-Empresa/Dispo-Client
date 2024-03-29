
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
    updateUserAccountInfo: "user-account/{id}",
    getAllUserInfo: "user-account/{id}",
    getAccountIdByEmail: "user-account/getAccountIdByEmail"
  },

  products: {
    get: "products/{id}",
    getAll: "products",
    createProduct: "products",
    updateProduct: "products/edit",
    getProductNames: "products/get-names",
    getWithActivePurschaseOrder: "products/get-with-active-pursche-orders/{movementType}",
    getProductsWithSalePrice: "products/get-with-saleprice",
    getPurchaseOrders: "products/getPurchaseOrders" // teste - apagar
  },

  movements: {
    moveProduct: "movements/move/batch",
    getAll: "movements"
  },

  manufacturers: {
    getAll: "manufacturers",
    get: "manufacturers/{id}",
    createManufacturer: "manufacturers",
    updateManufacturer: "manufacturers/edit"
  },

  suppliers: {
    getAll: "suppliers",
    get: "suppliers/{id}",
    createSupplier: "suppliers",
    updateSupplier: "suppliers/edit"
  },

  warehouses: {
    getWithAdressByUser: "warehouses/get-with-address-by-user",
    getWithAdress: "warehouses/get-with-address",
    create: "warehouses",
    getAll: "warehouses",
    getWarehousesByAccountId: "warehouses/get-by-accountId/{accountId}"
  },

  addresses: {
    getFormattedAddresses: "address/get-formatted-addresses"
  },

  batches: {
    getByProduct: "batches/get-by-product/{productId}",
    getTotalQuantityOfProducts: "batches/get-total-quantity-products/{productId}"
  },

  purchaseorder:{
    createPurchaseOrder: "purchase-orders",
    getByProduct: "purchase-orders/get-by-product/{productId}",
    getAll: "purchase-orders"
  }
};

export { LOCALHOST, ENDPOINTS };
