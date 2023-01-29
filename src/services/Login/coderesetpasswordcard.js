import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleEmailCodeChecker = (code) => {

    return createAPIEndpoint(ENDPOINTS.forgotPassword.emailCodeChecker) 
           .post(code)
}