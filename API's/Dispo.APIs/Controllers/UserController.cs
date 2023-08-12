using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain.DTOs.Response;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserAccountService _userAccountService;
        private readonly IAccountRepository _accountRepository;
        private readonly IUserService _userService;
        private readonly IAccountResolverService _accountResolverService;

        public UserController(IUserAccountService userAccountService, IAccountRepository accountRepository, IUserService userService, IAccountResolverService accountResolverService)
        {
            _userAccountService = userAccountService;
            _accountRepository = accountRepository;
            _userService = userService;
            _accountResolverService = accountResolverService;
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult UpdateUserAccountInfo(long accountId, [FromBody] UserAccountResponseDto userAccountModel)
        {
            try
            {
                var response = _userAccountService.UpdateUserAccountInfo(accountId, userAccountModel);

                return Ok(new ResponseModelBuilder().WithMessage("Dados atualizados com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithData(response)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"Erro não esperado: {ex.Message}")
                                                            .WithSuccess(false)
                                                            .WithData(ex)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public IActionResult GetAllUserInfo(long id)
        {
            try
            {
                var userAccountInfo = _accountRepository.GetUserInfoResponseDto(id);

                return Ok(new ResponseModelBuilder().WithSuccess(true)
                                                    .WithData(userAccountInfo)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"Erro não esperado: {ex.Message}")
                                            .WithSuccess(false)
                                            .WithData(ex)
                                            .WithAlert(AlertType.Error)
                                            .Build());
            }
        }
    }
}