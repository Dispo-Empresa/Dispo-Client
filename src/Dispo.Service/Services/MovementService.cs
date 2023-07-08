using Dispo.Domain.DTOs.RequestDTOs;
using Dispo.Domain.Entities;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Microsoft.Extensions.Logging;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class MovementService : IMovementService
    {
        private readonly IMovementRepository _movementRepository;
        private readonly IProductService _productService;
        private readonly ILogger<MovementService> _logger;

        public MovementService(IMovementRepository movementRepository, IProductService productService, ILogger<MovementService> logger)
        {
            _movementRepository = movementRepository;
            _productService = productService;
            _logger = logger;
        }

        /// <summary>
        /// Realiza a movimentação de um produto.
        /// </summary>
        /// <param name="productMovimentationDto"></param>
        /// <returns></returns>
        /// <exception cref="NotFoundedException"></exception>
        /// <exception cref="UnhandledException"></exception>
        public async Task MoveProductAsync(ProductMovimentationDto productMovimentationDto)
        {
            _logger.LogInformation("Iniciando uma movimentação do produto {P} no depósito {I}.", productMovimentationDto.ProductId, productMovimentationDto.WarehouseId);

            await ValidateProductExistenceAsync(productMovimentationDto.ProductId);

            using (var ts = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                await CreateMovementAsync(productMovimentationDto);
                await UpdateProductWarehouseQuantityAsync(productMovimentationDto);

                ts.Complete();
            }

            _logger.LogInformation("Movimentação do produto {P} no depósito {I} realizada.", productMovimentationDto.ProductId, productMovimentationDto.WarehouseId);
        }
        
        /// <summary>
        /// Validate if a Product exists by its Id.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        /// <exception cref="NotFoundedException"></exception>
        private async Task ValidateProductExistenceAsync(long productId)
        {
            var productExists = await _productService.ExistsByIdAsync(productId);
            if (!productExists)
            {
                _logger.LogError("Produto com o Id {P} não foi encontrado.", productId);
                throw new NotFoundedException($"Produto com o Id {productId} não foi encontrado.");
            }
        }

        /// <summary>
        /// Creates a new movimentation
        /// </summary>
        /// <param name="productMovimentationDto"></param>
        /// <returns></returns>
        /// <exception cref="UnhandledException"></exception>
        private async Task CreateMovementAsync(ProductMovimentationDto productMovimentationDto)
        {
            var createdMovimentation = await _movementRepository.CreateAsync(new Movement
            {
                Date = DateTime.UtcNow,
                //ProductId = productMovimentationDto.ProductId,
                Quantity = productMovimentationDto.Quantity,
                Type = productMovimentationDto.MovementType,
            });

            if (!createdMovimentation)
            {
                _logger.LogError("Movimentação não pode ser criada.");
                throw new UnhandledException("Movimentação não pode ser criada.");
            }
        }

        /// <summary>
        /// Update Product quantity in the Warehouse it's located.
        /// </summary>
        /// <param name="productMovimentationDto"></param>
        /// <returns></returns>
        /// <exception cref="UnhandledException"></exception>
        private async Task UpdateProductWarehouseQuantityAsync(ProductMovimentationDto productMovimentationDto)
        {
            //var updatedQuantity = await _productWarehouseQuantityService.UpdateProductWarehouseQuantityAsync(productMovimentationDto);
            //if (!updatedQuantity)
            //{
            //    _logger.LogError("Quantidade não pode ser atualizada.");
            //    throw new UnhandledException("Quantidade não pode ser atualizada.");
            //}
        }
    }
}