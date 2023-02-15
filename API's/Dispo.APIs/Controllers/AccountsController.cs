using Dispo.API.ResponseBuilder;
using Dispo.Commom;
using Dispo.Infrastructure.Repositories.Interfaces;
using EscNet.Cryptography.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IRijndaelCryptography _rijndaelCryptography;

        public AccountsController(IAccountRepository accountRepository, IRijndaelCryptography rijndaelCryptography)
        {
            _accountRepository = accountRepository;
            _rijndaelCryptography = rijndaelCryptography;
        }

        [HttpPost]
        [Route("getAccountIdByEmail")]
        public IActionResult GetAccountIdByEmail([FromBody] string email)
        {
            var accountId = _accountRepository.GetAccountIdByEmail(_rijndaelCryptography.Encrypt(email));

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