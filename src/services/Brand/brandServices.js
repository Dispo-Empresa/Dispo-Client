import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleRegisterBrand = (dataRequest) => {
    
    return createAPIEndpoint(ENDPOINTS.brand.registerBrand)
           .post(dataRequest)
}

export const handleGetBrandNames = () => {
    
    return createAPIEndpoint(ENDPOINTS.brand.getBrandNames)
           .getAll()
}