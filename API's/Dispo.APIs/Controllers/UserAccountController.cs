﻿using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Infrastructure.Repositories.Interfaces;
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
        private readonly IAccountRepository _accountRepository;
        private readonly IUserRepository _userRepository;

        public UserAccountController(IUserAccountService userAccountService, IAccountRepository accountRepository, IUserRepository userRepository)
        {
            _userAccountService = userAccountService;
            _accountRepository = accountRepository;
            _userRepository = userRepository;
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

        [HttpGet]
        [Route("getAllUserInfo/{accountId}")]
        [Authorize]
        public IActionResult GetAllUserInfo(int accountId)
        {
            try
            {
                var userAccountInfo = _accountRepository.GetUserInfoResponseDto(accountId);

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