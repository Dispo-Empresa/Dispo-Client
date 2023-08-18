using Dispo.API.ResponseBuilder;
using Dispo.Commom;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using EscNet.Cryptography.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/accounts")]
    [ApiController]
    [Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IRijndaelCryptography _rijndaelCryptography;
        private readonly IAccountResolverService _accountResolverService;
        private readonly IAccountService _accountService;

        public AccountsController(IAccountRepository accountRepository, IRijndaelCryptography rijndaelCryptography, IAccountResolverService userResolverService, IAccountService accountService)
        {
            _accountRepository = accountRepository;
            _rijndaelCryptography = rijndaelCryptography;
            _accountResolverService = userResolverService;
            _accountService = accountService;
        }

        [HttpGet]
        [Route("get-id")]
        public IActionResult GetAccountIdByEmail([FromRoute] string email)
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

        [HttpPost]
        [AllowAnonymous]
        [Route("change-warehouse")]
        public IActionResult ChangeWarehouse([FromBody] long warehouseId)
        {
            try
            {
                var accountId = _accountResolverService.GetLoggedAccountId() ?? throw new NotFoundException("Faça o login no sistema.");
                _accountService.ChangeWarehouse(accountId, warehouseId);

                return Ok(new ResponseModelBuilder().WithMessage("O depósito foi vinculado ao usuário.")
                                                    .WithSuccess(true)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .Build()); ;
            }
        }
    }
}