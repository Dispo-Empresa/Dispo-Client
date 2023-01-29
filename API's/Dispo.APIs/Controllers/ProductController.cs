using Dispo.API.ResponseBuilder;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/products/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IProductRepository _productRepository;

        public ProductController(IProductService productService, IProductRepository productRepository)
        {
            _productService = productService;
            _productRepository = productRepository;
        }

        [HttpPost]
        [Route("registerProduct")]
        public IActionResult CreateProduct([FromBody] ProductRequestDto productModel)
        {
            try
            {
                var productCreated = _productService.CreateProduct(productModel);
                return Ok(productCreated);
            }
            catch (AlreadyExistsException ex)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("getProductNamesWithCode")]
        public IActionResult GetProductNamesWithCode()
        {
            try
            {
                var productNamesWithCodes = _productService.GetProductNamesWithCode();
                return Ok(productNamesWithCodes);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("getAllProductsInfo")]
        public async Task<IActionResult> GetAllProductsInfo()
        {
            try
            {
                var products = _productRepository.GetAllAsNoTracking();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage("Products not found: " + ex.Message)
                                                            .Build());
            }
        }
    }
}