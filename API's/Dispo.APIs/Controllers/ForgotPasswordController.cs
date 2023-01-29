using Dispo.API.ResponseBuilder;
using Dispo.Domain.Exceptions;
using Dispo.Service.DTOs.PluginDTOs.RequestsDTOs;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/forgotPassword/[controller]")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IPasswordRecoveryService _passwordRecoveryService;

        public ForgotPasswordController(IAccountService accountService, IPasswordRecoveryService emailRecoveryService)
        {
            _accountService = accountService;
            _passwordRecoveryService = emailRecoveryService;
        }

        [HttpPost]
        [Route("sendResetPasswordCode")]
        public async Task<IActionResult> SendEmailCodeResetPassword([FromBody] string emailTo)
        {
            try
            {
                var responseData = await _passwordRecoveryService.SendRecoveryToken(emailTo);

                return Ok(responseData);
            }
            catch (HttpRequestException ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"Verifique se a API está ONLINE.")
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
                _passwordRecoveryService.ValidateInputedToken(verifyEmailCodeRequestDto.Email, verifyEmailCodeRequestDto.InputedToken);

                return Ok(new ResponseModelBuilder().WithMessage("Código validado.")
                                                    .WithSuccess(true)
                                                    .Build());
            }
            catch (PasswordRecoveryException ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message).Build());
            }
        }

        [HttpPost]
        [Route("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto resetPasswordRequestDto)
        {
            try
            {
                await _accountService.ResetPassword(resetPasswordRequestDto.AccountId, resetPasswordRequestDto.NewPassword);

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