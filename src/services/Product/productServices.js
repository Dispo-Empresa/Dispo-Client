import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleRegisterProduct = (dataRequest) => {
    
    return createAPIEndpoint(ENDPOINTS.product.registerProduct)
           .post(dataRequest)
}

export const handleGetProductNamesWithCode = () => {
    
    return createAPIEndpoint(ENDPOINTS.product.getProductNamesWithCode)
           .getAll()
}