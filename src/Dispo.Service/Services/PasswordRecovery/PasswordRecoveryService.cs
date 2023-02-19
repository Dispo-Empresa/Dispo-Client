using Dispo.Domain.Exceptions;
using Dispo.Domain.Queues.Publishers.Interfaces;
using Dispo.Service.Cache.Interfaces;
using Dispo.Service.DTOs.PluginDTOs;
using Dispo.Service.DTOs.PluginDTOs.RequestsDTOs;
using Dispo.Service.Services.Interfaces;
using Dispo.Service.Services.PasswordRecovery.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace Dispo.Service.Services.PasswordRecovery
{
    public class PasswordRecoveryService : IPasswordRecoveryService
    {
        private readonly ICacheManager _cacheManager;
        private readonly ITokenGeneratorService _codeGeneratorService;
        private readonly IEmailSenderPublisher _emailSenderPublisher;
        private readonly IConfiguration _configuration;

        public PasswordRecoveryService(ICacheManager cacheManager, ITokenGeneratorService codeGeneratorService, IEmailSenderPublisher emailSenderPublisher, IConfiguration configuration)
        {
            _cacheManager = cacheManager;
            _codeGeneratorService = codeGeneratorService;
            _emailSenderPublisher = emailSenderPublisher;
            _configuration = configuration;
        }

        public void SendRecoveryToken(string emailTo)
        {
            var request = CreateRecoveryTokenRequest(emailTo);

            _cacheManager.Add(emailTo, request.RecoveryToken, 300);

            var requestJson = JsonConvert.SerializeObject(request);

            _emailSenderPublisher.Publish(requestJson);
        }

        public void ValidateInputedToken(VerifyEmailCodeRequestDto verifyEmailCodeRequestDto)
        {
            var tokenInCache = _cacheManager.Get(verifyEmailCodeRequestDto.Email);

            if (string.IsNullOrEmpty(tokenInCache))
                throw new PasswordRecoveryException("O token informado está expirado, solicite um novo token.");

            if (!tokenInCache.Equals(verifyEmailCodeRequestDto.InputedToken))
                throw new PasswordRecoveryException("O token para recuperação de senha está incorreto.");

            _cacheManager.Remove(verifyEmailCodeRequestDto.Email);
        }

        public EmailSenderRequestDto CreateRecoveryTokenRequest(string emailTo)
        {
            return new EmailSenderRequestDto
            {
                Subject = "Dispo - Redefinição de Senha",
                EmailFrom = _configuration["EmailSenderWithCodeConfig:EmailFrom"],
                EmailTo = emailTo,
                RecoveryToken = _codeGeneratorService.GenerateRecoveryTokenNumbers(),
                AuthenticateInfo = new EmailAuthenticateInfoDto
                {
                    EmailAuth = _configuration["EmailSenderWithCodeConfig:AuthenticateInfo:EmailAuth"],
                    PasswordAuth = _configuration["EmailSenderWithCodeConfig:AuthenticateInfo:PasswordAuth"]
                }
            };
        }
    }
}