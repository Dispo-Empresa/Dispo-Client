using Dispo.API.ResponseBuilder;
using Dispo.Commom;
using Dispo.Infrastructure.Repositories.Interfaces;
using EscNet.Cryptography.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/accounts/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IRijndaelCryptography _rijndaelCryptography; //teste real agora

        public AccountController(IAccountRepository accountRepository, IRijndaelCryptography rijndaelCryptography)
        {
            _accountRepository = accountRepository;
            _rijndaelCryptography = rijndaelCryptography;
        }

        [HttpPost]
        [Route("getAccountIdByEmail")]
        public async Task<IActionResult> GetAccountIdByEmail([FromBody] string email)
        {
            var accountId = await _accountRepository.GetAccountIdByEmail(_rijndaelCryptography.Encrypt(email));

            if (accountId.IsIdValid())
            {
                return Ok(new ResponseModelBuilder().WithMessage($"Account Id: {accountId}")
                                                    .WithSuccess(true)
                                                    .WithData(accountId)
                                                    .Build());
            }

            return BadRequest(new ResponseModelBuilder().WithMessage("Account Id not found")
                                                        .Build());
        }
    }
}