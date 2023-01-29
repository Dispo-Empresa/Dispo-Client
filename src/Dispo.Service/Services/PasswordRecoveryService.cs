using Dispo.Domain.Exceptions;
using Dispo.Service.Cache.Interfaces;
using Dispo.Service.DTOs.PluginDTOs;
using Dispo.Service.DTOs.PluginDTOs.RequestsDTOs;
using Dispo.Service.DTOs.PluginDTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;
using Newtonsoft.Json;
using System.Net.Http.Json;

namespace Dispo.Service.Services
{
    public class PasswordRecoveryService : IPasswordRecoveryService
    {
        private const string CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        private const short TOKEN_SIZE = 6;

        private readonly ICacheManager _cacheManager;

        public PasswordRecoveryService(ICacheManager cacheManager)
        {
            _cacheManager = cacheManager;
        }

        #region Public Methods

        public async Task<EmailSenderResponseDto?> SendRecoveryToken(string emailTo)
        {
            EmailSenderResponseDto? responseData;
            var request = CreateRecoveryTokenRequest(emailTo);

            using (var client = new HttpClient())
            {
                var response = await client.PostAsJsonAsync(@"https://localhost:7145/api/v1/emailSender/sendEmail", request);
                responseData = JsonConvert.DeserializeObject<EmailSenderResponseDto>(await response.Content.ReadAsStringAsync());
            }

            return responseData;
        }

        public void ValidateInputedToken(string email, string inputedToken)
        {
            var tokenInCache = _cacheManager.Get(email);

            if (string.IsNullOrEmpty(tokenInCache))
            {
                throw new PasswordRecoveryException($"Não foi possível recuperar um token de recuperação de senha para o email {email}.");
            }

            if (!tokenInCache.Equals(inputedToken))
            {
                throw new PasswordRecoveryException($"O token para recuperação de senha está incorreto.");
            }
        }

        public void RemoveFromCacheByEmail(string email)
        {
            _cacheManager.Remove(email);
        }

        #endregion Public Methods

        #region Private Methods

        private EmailSenderRequestDto CreateRecoveryTokenRequest(string emailTo)
        {
            var token = GenerateRecoveryToken();

            _cacheManager.Add(emailTo, token, 3600);

            return new EmailSenderRequestDto
            {
                Subject = "Dispo - Redefinição de Senha",
                EmailFrom = "molinari.arthureduardo@gmail.com",
                EmailTo = emailTo,
                RecoveryToken = token,
                AuthenticateInfo = new EmailAuthenticateInfoDto
                {
                    EmailAuth = "molinari.arthureduardo@gmail.com",
                    PasswordAuth = ""
                }
            };
        }

        private string GenerateRecoveryToken()
        {
            var random = new Random();
            return new string(Enumerable.Repeat(CHARS, TOKEN_SIZE).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        #endregion Private Methods
    }
}