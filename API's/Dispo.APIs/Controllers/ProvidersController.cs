using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.APIs.Controllers
{
    [Route("/api/v1/[controller]")]
    [ApiController]
    public class ProvidersController : ControllerBase
    {
        private readonly IProviderService _providerService;
        private readonly IProviderRepository _providerRepository;

        public ProvidersController(IProviderService providerService, IProviderRepository providerRepository)
        {
            _providerService = providerService;
            _providerRepository = providerRepository;
        }

        [HttpPost]
        [Route("RegisterProvider")]
        [Authorize]
        public IActionResult CreateProvider(ProviderRequestDto providerRequestDto)
        {
            try
            {
                var providerCreated = _providerService.CreateProvider(providerRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Fornecedor criado com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (AlreadyExistsException ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"Erro inesperado: {ex.Message}")
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }

        [HttpGet]
        [Route("getAllProvidersInfo")]
        [Authorize]
        public IActionResult GetAllProvidersInfo()
        {
            try
            {
                var providers = _providerRepository.GetAllProvidersInfo();

                return Ok(new ResponseModelBuilder().WithData(providers)
                                                    .WithSuccess(true)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage($"Erro inesperado: {ex.Message}")
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }
    }
}