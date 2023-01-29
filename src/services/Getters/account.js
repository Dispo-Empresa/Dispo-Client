import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export function getAccountIdByEmail(email) {

    return createAPIEndpoint(ENDPOINTS.account.getAccountIdByEmail)
           .post(email)
}