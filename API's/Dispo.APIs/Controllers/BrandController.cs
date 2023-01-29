using Dispo.API.ResponseBuilder;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/brands/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IBrandRepository _brandRepository;

        public BrandController(IBrandService brandService, IBrandRepository brandRepository)
        {
            _brandService = brandService;
            _brandRepository = brandRepository;
        }

        [HttpPost]
        [Route("registerBrand")]
        public IActionResult CreateBrand([FromBody] BrandRequestDto brandRequestDto)
        {
            try
            {
                var brandCreated = _brandService.CreateBrand(brandRequestDto);

                return Ok(brandCreated);
            }
            catch (AlreadyExistsException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getBrandNames")]
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
        public async Task<IActionResult> GetAllBrandInfo()
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