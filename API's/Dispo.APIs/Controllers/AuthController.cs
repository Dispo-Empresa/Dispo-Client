using Dispo.API.ResponseBuilder;
using Dispo.Domain.Exceptions;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;
using Dispo.Service.Token.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/auth/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITokenGenerator _tokenGenerator;

        public AuthController(IAccountService accountService, ITokenGenerator tokenGenerator)
        {
            _accountService = accountService;
            _tokenGenerator = tokenGenerator;
        }

        [HttpPost]
        [Route("signin")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn([FromBody] SignInRequestDto signInRequestDto)
        {
            try
            {
                var userAccountModelCretated = await _accountService.GetUserWithAccountByEmailAndPassword(signInRequestDto.Email, signInRequestDto.Password);
                var generatedToken = _tokenGenerator.GenerateToken(userAccountModelCretated.Id);

                return Ok(new ResponseModelBuilder().WithMessage("User exists!")
                                                    .WithSuccess(true)
                                                    .WithData(new SignUpResponseDto()
                                                    {
                                                        userResponseDto = userAccountModelCretated,
                                                        tokenResponseDto = generatedToken
                                                    })
                                                    .Build());
            }
            catch (NotFoundedException ex)
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

        [HttpPost]
        [Route("signup")]
        [AllowAnonymous]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequestDto signUpRequestDto)
        {
            try
            {
                var createdUser = await _accountService.CreateAccountAndUser(signUpRequestDto);

                return Created("/api/v1/auth/signup", new ResponseModelBuilder().WithMessage("User Created!")
                                                                                .WithSuccess(true)
                                                                                .WithData(createdUser)
                                                                                .Build());
            }
            catch (AlreadyExistsException ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
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