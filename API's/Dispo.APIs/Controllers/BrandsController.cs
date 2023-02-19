using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IBrandRepository _brandRepository;

        public BrandsController(IBrandService brandService, IBrandRepository brandRepository)
        {
            _brandService = brandService;
            _brandRepository = brandRepository;
        }

        [HttpPost]
        [Route("registerBrand")]
        [Authorize]
        public IActionResult CreateBrand([FromBody] BrandRequestDto brandRequestDto)
        {
            try
            {
                var brandCreated = _brandService.CreateBrand(brandRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Marca criada com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithData(brandCreated)
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
        [Route("getBrandNames")]
        [Authorize]
        public IActionResult GetBrandNames()
        {
            try
            {
                var brandNames = _brandService.GetBrandNames();
                return Ok(brandNames);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("getAllBrandsInfo")]
        [Authorize]
        public IActionResult GetAllBrandInfo()
        {
            try
            {
                var brands = _brandRepository.GetAllAsNoTracking();

                return Ok(brands);
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage("Brands not found: " + ex.Message)
                                                            .Build());
            }
        }
    }
}