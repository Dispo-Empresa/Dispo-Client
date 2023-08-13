using Dispo.API.ResponseBuilder;
using Dispo.APIs;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dispo.API.Controllers
{
    [Route("/api/v1/products")]
    [ApiController]
    [Authorize]
    public class ProductsController : DispoBaseController
    {
        private readonly IProductService _productService;
        private readonly IProductRepository _productRepository;

        public ProductsController(ILogger<ProductsController> logger, IProductService productService, IProductRepository productRepository) : base(logger)
        {
            _productService = productService;
            _productRepository = productRepository;
        }

        [HttpPost]
        public IActionResult Create([FromBody] ProductRequestDto productRequestDto)
        {
            try
            {
                var productCreatedId = _productService.CreateProduct(productRequestDto);

                return Ok(new ResponseModelBuilder().WithMessage("Produto criado com sucesso!")
                                                    .WithSuccess(true)
                                                    .WithData(productCreatedId)
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
        [Route("get-names-with-code")]
        public IActionResult GetProductNamesWithCode()
        {
            try
            {
                var productNamesWithCodes = _productService.GetProductNamesWithCode();

                return Ok(productNamesWithCodes);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var products = _productRepository.GetProductInfoDto();

                return Ok(new ResponseModelBuilder().WithMessage("Movimentação de produto realizada com sucesso.")
                                                    .WithSuccess(true)
                                                    .WithData(products)
                                                    .WithAlert(AlertType.Success)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage("Products not found: " + ex.Message)
                                                            .Build());
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(long id)
        {
            try
            {
                var product = _productRepository.GetById(id);

                return Ok(product);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}