import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleGetAllBrandsInfo = () => {

    return createAPIEndpoint(ENDPOINTS.brand.getAllBrands)
           .getAll();
}