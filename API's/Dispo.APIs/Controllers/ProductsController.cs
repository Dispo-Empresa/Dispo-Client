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
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductService productService, IProductRepository productRepository)
        {
            _productService = productService;
            _productRepository = productRepository;
        }

        [HttpPost]
        [Route("registerProduct")]
        [Authorize]
        public IActionResult CreateProduct([FromBody] ProductRequestDto productModel)
        {
            try
            {
                var productCreated = _productService.CreateProduct(productModel);

                return Ok(new ResponseModelBuilder().WithMessage("Produto criado com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithData(productCreated)
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
        [Route("getProductNamesWithCode")]
        [Authorize]
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
        [Authorize]
        public IActionResult GetAllProductsInfo()
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