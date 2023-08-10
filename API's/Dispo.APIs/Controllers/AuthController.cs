using Dispo.API.ResponseBuilder;
using Dispo.APIs;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.DTOs.Response;
using Dispo.Domain.Exceptions;
using Dispo.Service.Services.Interfaces;
using Dispo.Service.Token.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/auth")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : DispoBaseController
    {
        private readonly IAccountService _accountService;
        private readonly ITokenGenerator _tokenGenerator;

        public AuthController(ILogger<AuthController> logger, IAccountService accountService, ITokenGenerator tokenGenerator) : base(logger)
        {
            _accountService = accountService;
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        [Route("signin")]
        public IActionResult SignIn([FromBody] SignInRequestDto signInRequestDto)
        {
            try
            {
                var userAccountModelCretated = _accountService.AuthenticateByEmailAndPassword(signInRequestDto.Email, signInRequestDto.Password);
                var generatedToken = _tokenGenerator.GenerateJwtToken(userAccountModelCretated.AccountId);

                return Ok(new ResponseModelBuilder().WithMessage("User exists!")
                                                    .WithSuccess(true)
                                                    .WithData(new SignInResponseDto()
                                                    {
                                                        AccountId = userAccountModelCretated.AccountId,
                                                        UserName = userAccountModelCretated.UserName,
                                                        Role = userAccountModelCretated.Role,
                                                        TokenInfo = generatedToken
                                                    })
                                                    .Build());
            }
            catch (NotFoundException ex)
            {
                return NotFound(new ResponseModelBuilder().WithMessage(ex.Message)
                                                          .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"{ex.Message} {ex.InnerException?.Message}")
                                                            .Build());
            }
        }
    }
}