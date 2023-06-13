using Dispo.API.ResponseBuilder;
using Dispo.APIs.ResponseBuilder;
using Dispo.Domain.DTOs.RequestDTOs;
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
        private readonly IMovementService _movementService;

        public ProductsController(IProductService productService, IProductRepository productRepository, IMovementService movementService)
        {
            _productService = productService;
            _productRepository = productRepository;
            _movementService = movementService;
        }

        [HttpPost]
        [Route("register")]
        [Authorize]
        public IActionResult CreateProduct([FromBody] ProductRequestDto productRequestDto)
        {
            try
            {
                var productCreated = _productService.CreateProduct(productRequestDto);

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
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("getAllProducts")]
        [Authorize]
        public IActionResult GetAllProducts()
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

        [HttpGet]
        [Route("getProductById/{productId}")]
        [Authorize]
        public IActionResult GetProductById(long productId)
        {
            try
            {
                var product = _productRepository.GetById(productId);

                return Ok(product);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        /// <summary>
        /// Realiza a movimentação de um produto.
        /// </summary>
        /// <param name="productMovimentationDto"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("moveProduct")]
        [Authorize]
        public async Task<IActionResult> MoveProduct([FromBody] ProductMovimentationDto productMovimentationDto)
        {
            try
            {
                productMovimentationDto.Validate();
                await _movementService.MoveProductAsync(productMovimentationDto);

                return Ok(new ResponseModelBuilder().WithMessage("Movimentação de produto realizada com sucesso.")
                                                    .WithSuccess(true)
                                                    .Build());
            }
            catch (Exception ex)
            {
                return BadRequest(new ResponseModelBuilder().WithMessage(ex.Message)
                                                            .WithSuccess(false)
                                                            .Build());
            }
        }
    }
}