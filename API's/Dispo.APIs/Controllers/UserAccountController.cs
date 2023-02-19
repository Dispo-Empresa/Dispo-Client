using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/[controller]")]
    [ApiController]
    public class UserAccountController : ControllerBase
    {
        private readonly IUserAccountService _userAccountService;

        public UserAccountController(IUserAccountService userAccountService)
        {
            _userAccountService = userAccountService;
        }

        [HttpPut]
        [Route("updateUserAccountInfo/{accountId}")]
        [Authorize]
        public IActionResult UpdateUserAccountInfo(int accountId, [FromBody] UserAccountResponseDto userAccountModel)
        {
            try
            {
                userAccountModel.Id = accountId;
                var response = _userAccountService.UpdateUserAccountInfo(userAccountModel);

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
    }
}