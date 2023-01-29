import { createAPIEndpoint, ENDPOINTS } from "../apiMap";

export const handleSendResetPasswordCodeEmail = (emailRequest) => {
    createAPIEndpoint(ENDPOINTS.forgotPassword.sendResetPasswordCode)
    .post(emailRequest)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}