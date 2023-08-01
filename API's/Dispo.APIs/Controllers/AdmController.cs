using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.APIs.Controllers
{
    [Route("api/v1/adm")]
    [ApiController]
    [Authorize(Roles = Roles.Manager)]
    public class AdmController : DispoBaseController
    {
        public readonly IAdmService _admService;
        public readonly IRoleRepository _roleRepository;
        private readonly IAccountRepository _accountRepository;

        public AdmController(ILogger<AdmController> logger, IAdmService admService, IRoleRepository roleRepository, IAccountRepository accountRepository) : base(logger)
        {
            _admService = admService;
            _roleRepository = roleRepository;
            _accountRepository = accountRepository;
        }

        [HttpGet]
        [Route("getRoles")]
        public IActionResult GetRoles()
        {
            try
            {
                var roles = _roleRepository.GetRoleInfo();

                return Ok(new ResponseModelBuilder().WithData(roles)
                                                    .WithSuccess(true)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }

        [HttpPost]
        [Route("createEmployee")]
        public IActionResult CreateEmployee([FromBody] CreateEmployeeRequestDto createEmployeeRequestDto)
        {
            try
            {
                _admService.CreateEmployee(createEmployeeRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Funcionário criado com sucesso.")
                                                    .WithSuccess(true)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }

        [HttpGet]
        [Route("employees")]
        public IActionResult GetEmployees()
        {
            try
            {
                var employeesAccountInfo = _accountRepository.GetAccountsUserInfo();

                return Ok(new ResponseModelBuilder().WithData(employeesAccountInfo)
                                                    .WithSuccess(true)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }
    }
}
