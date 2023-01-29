using Dispo.Service.DTOs.PluginDTOs.ResponseDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IPasswordRecoveryService
    {
        Task<EmailSenderResponseDto?> SendRecoveryToken(string emailTo);

        void ValidateInputedToken(string email, string inputedToken);

        void RemoveFromCacheByEmail(string email);
    }
}