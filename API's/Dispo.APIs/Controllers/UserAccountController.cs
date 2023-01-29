using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/userAccount/[controller]")]
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
        public async Task<IActionResult> UpdateUserAccountInfo(int accountId, [FromBody] UserAccountResponseDto userAccountModel) // IMPLEMENTAR AUTHORIZATION NOS HEADERS DAS REQUISICOES
        {
            try
            {
                userAccountModel.Id = accountId;

                var response = await _userAccountService.UpdateUserAccountInfo(userAccountModel);

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}