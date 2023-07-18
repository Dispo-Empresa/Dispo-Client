using Dispo.API.ResponseBuilder;
using Dispo.Commom;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using EscNet.Cryptography.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepository accountRepository;
        private readonly IRijndaelCryptography rijndaelCryptography;
        private readonly IUserResolverService userResolverService;

        public AccountsController(IAccountRepository accountRepository, IRijndaelCryptography rijndaelCryptography, IUserResolverService userResolverService)
        {
            this.accountRepository = accountRepository;
            this.rijndaelCryptography = rijndaelCryptography;
            this.userResolverService = userResolverService;
        }

        [HttpGet]
        [Route("get-id")]
        [Authorize]
        public IActionResult GetAccountIdByEmail([FromRoute] string email)
        {
            var accountId = accountRepository.GetAccountIdByEmail(rijndaelCryptography.Encrypt(email));

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