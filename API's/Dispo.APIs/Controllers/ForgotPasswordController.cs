using Dispo.API.ResponseBuilder;
using Dispo.Domain.Exceptions;
using Dispo.Service.Cache.Interfaces;
using Dispo.Service.DTOs.PluginDTOs.RequestsDTOs;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.Services.Interfaces;
using Dispo.Service.Services.PasswordRecovery.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/[controller]")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPasswordRecoveryService _passwordRecoveryService;
        private readonly ICacheManager _cacheManager;

        public ForgotPasswordController(IAccountService accountService, IPasswordRecoveryService emailRecoveryService, ICacheManager cacheManager)
        {
            _accountService = accountService;
            _passwordRecoveryService = emailRecoveryService;
            _cacheManager = cacheManager;
        }

        [HttpPost]
        [Route("sendResetPasswordCode")]
        public IActionResult SendEmailCodeResetPassword([FromBody] string emailTo)
        {
            try
            {
                _passwordRecoveryService.SendRecoveryToken(emailTo);

                return Ok(new ResponseModelBuilder().WithMessage("O email será enviado em instantes.")
                                                    .WithSuccess(true)
                                                    .Build());
            }
            catch (HttpRequestException)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"Serviço não encontrado ou fora do ar")
                                                            .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"{ex.Message} {ex.InnerException?.Message}")
                                                            .Build());
            }
        }

        [HttpPost]
        [Route("emailCodeChecker")]
        public IActionResult VerifyEmailCode([FromBody] VerifyEmailCodeRequestDto verifyEmailCodeRequestDto)
        {
            try
            {
                _passwordRecoveryService.ValidateInputedToken(verifyEmailCodeRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Código validado.")
                                                    .WithSuccess(true)
                                                    .Build());
            }
            catch (PasswordRecoveryException ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .Build());
            }
        }

        [HttpPost]
        [Route("resetPassword")]
        public IActionResult ResetPassword([FromBody] ResetPasswordRequestDto resetPasswordRequestDto)
        {
            try
            {
                _accountService.ResetPassword(resetPasswordRequestDto.AccountId, resetPasswordRequestDto.NewPassword);

                return Ok(new ResponseModelBuilder().WithMessage("Senha alterada.")
                                                    .WithSuccess(true)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}