import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleGetAllProductsInfo = () => {

    return createAPIEndpoint(ENDPOINTS.product.getAllProducts)
            .getAll();
}

export const handleGetProductById = (productId) => {

    return createAPIEndpoint(ENDPOINTS.product.getProductById)
            .post(productId);
}