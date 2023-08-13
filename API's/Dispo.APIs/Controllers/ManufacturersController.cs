using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.APIs.Controllers
{
    [Route("/api/v1/manufacturers")]
    [ApiController]
    [Authorize]
    public class ManufacturersController : DispoBaseController
    {
        private readonly IManufacturerRepository _manufacturerRepository;
        private readonly IManufacturerService _manufacturerService;

        public ManufacturersController(ILogger<ManufacturersController> logger, IManufacturerRepository manufacturerRepository, IManufacturerService manufacturerService) : base(logger)
        {
            _manufacturerRepository = manufacturerRepository;
            _manufacturerService = manufacturerService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] ManufacturerRequestDto manufacturerRequestDto)
        {
            try
            {
                var manufacturerCreatedId = _manufacturerService.CreateManufacturer(manufacturerRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Fabricante criado com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithData(manufacturerCreatedId)
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
                return BadRequest(new ResponseModelBuilder().WithMessage($"Erro inesperado:  {ex.Message}")
                                                            .WithSuccess(false)
                                                            .WithAlert(AlertType.Error)
                                                            .Build());
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var manufacturers = _manufacturerRepository.GetManufacturerInfoDto();

                return Ok(new ResponseModelBuilder().WithData(manufacturers)
                                                    .WithSuccess(true)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage("Manufacturers not found: " + ex.Message)
                                                            .Build());
            }
        }
    }
}
