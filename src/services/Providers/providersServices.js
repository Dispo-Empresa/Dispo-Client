import { createAPIEndpoint, ENDPOINTS  } from "../apiMap";

export const handleRegisterProvider = (dataRequest) => {
    
    return createAPIEndpoint(ENDPOINTS.provider.registerProduct)
            .post(dataRequest);
};

export const handleGetAllProvidersInfo = () => {
    return createAPIEndpoint(ENDPOINTS.provider.getAllProvidersInfo)
            .getAll();
};