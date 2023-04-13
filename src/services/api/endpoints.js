const endpoints = {

    auth: {
        signIn: "Auth/signin",
        signUp: "Auth/signup"
      },
    
      accounts: {
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
    
      brands: {
        registerBrand: "Brands/registerBrand",
        getBrandNames: "Brands/getBrandNames",
        getAllBrands: "Brands/getAllBrandsInfo",
        getBrandById: "Brands/getBrandById",
      },
    
      products: {
        registerProduct: "Products/registerProduct",
        getProductNamesWithCode: "Products/getProductNamesWithCode",
        getAllProducts: "Products/getAllProductsInfo",
        getProductById: "Products/getProductById",
      },
    
      providers: {
        registerProduct: "Providers/registerProvider",
        getAllProvidersInfo: "Providers/getAllProvidersInfo",
        getProviderById: "Providers/getProviderById",
      },
};

export default endpoints;
