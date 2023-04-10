import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleGetProviderById = (providerId) => {

    return createAPIEndpoint(ENDPOINTS.provider.getProviderById)
            .post(providerId);
}