import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleGetAllProductsInfo = () => {

    return createAPIEndpoint(ENDPOINTS.product.getAllProducts)
           .getAll();
}