using Dispo.Service.DTOs.PluginDTOs.RequestsDTOs;

namespace Dispo.Service.Services.PasswordRecovery.Interfaces
{
    public interface IPasswordRecoveryService
    {
        void SendRecoveryToken(string emailTo);

        void ValidateInputedToken(VerifyEmailCodeRequestDto verifyEmailCodeRequestDto);

        EmailSenderRequestDto CreateRecoveryTokenRequest(string emailTo);
    }
}