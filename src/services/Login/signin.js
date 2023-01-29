import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleSignIn = (dataRequest) => {
    
    return createAPIEndpoint(ENDPOINTS.auth.signIn)
           .post(dataRequest)
}