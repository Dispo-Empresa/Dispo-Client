import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleUpdateUserAccountInfo = (id, dataRequest) => {

    return createAPIEndpoint(ENDPOINTS.userAccount.updateUserAccountInfo)
           .put(id, dataRequest)
}