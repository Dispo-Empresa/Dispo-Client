import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleGetAllBrandsInfo = () => {

    return createAPIEndpoint(ENDPOINTS.brand.getAllBrands)
           .getAll();
}

export const handleGetBrandById = (brandId) => {

    return createAPIEndpoint(ENDPOINTS.brand.getBrandById)
           .post(brandId);
}