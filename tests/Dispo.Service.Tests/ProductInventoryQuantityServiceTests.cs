using Dispo.Domain.DTOs.RequestDTOs;
using Dispo.Domain.Entities;
using Dispo.Domain.Enums;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;

namespace Dispo.Service.Tests
{
    public class ProductWarehouseQuantityServiceTests
    {
        private ProductWarehouseQuantityService _sut;
        private Mock<IProductWarehouseQuantityRepository> _productWarehouseQuantityRepositoryMock;
        private Mock<ILogger<ProductWarehouseQuantityService>> _loggerMock;

        [SetUp]
        public void Setup()
        {
            _productWarehouseQuantityRepositoryMock = new Mock<IProductWarehouseQuantityRepository>();
            _loggerMock = new Mock<ILogger<ProductWarehouseQuantityService>>();

            _sut = new ProductWarehouseQuantityService(_productWarehouseQuantityRepositoryMock.Object, _loggerMock.Object);
        }

        [Test]
        public async Task UpdateProductWarehouseQuantityAsync_AlreadyExistsWithInputOperation_IncreaseQuantityAndUpdate()
        {
            // Arrange
            var productMovimentationDto = new ProductMovimentationDto(1, 1, 10, eMovementType.Input);
            var productWarehouseQuantity = new ProductWarehouseQuantity(1, 1, 1);

            _productWarehouseQuantityRepositoryMock.Setup(s => s.GetByProductMovimentationAsync(It.IsAny<ProductMovimentationDto>()))
                .ReturnsAsync(productWarehouseQuantity);

            _productWarehouseQuantityRepositoryMock.Setup(s => s.UpdateProductWarehouseQuantityAsync(It.IsAny<ProductMovimentationDto>(), It.IsAny<double>()))
                .ReturnsAsync(true);

            // Act
            var result = await _sut.UpdateProductWarehouseQuantityAsync(productMovimentationDto);

            // Assert
            result.Should().BeTrue();
            _productWarehouseQuantityRepositoryMock.Verify(v => v.UpdateProductWarehouseQuantityAsync(productMovimentationDto, productMovimentationDto.Quantity + productWarehouseQuantity.Quantity));
        }

        [Test]
        public async Task UpdateProductWarehouseQuantityAsync_AlreadyExistsWithOutputOperationWithExistingQuantityMinorThanMovimentationQuantity_DontUpdate()
        {
            // Arrange
            var productMovimentationDto = new ProductMovimentationDto(1, 1, 10, eMovementType.Output);
            var productWarehouseQuantity = new ProductWarehouseQuantity(1, 1, 1);

            _productWarehouseQuantityRepositoryMock.Setup(s => s.GetByProductMovimentationAsync(It.IsAny<ProductMovimentationDto>()))
                .ReturnsAsync(productWarehouseQuantity);

            // Act
            var result = Assert.ThrowsAsync<BusinessException>(async () => await _sut.UpdateProductWarehouseQuantityAsync(productMovimentationDto));

            // Assert
            Assert.That(result.Message, Is.EqualTo("Quantidade da movimentação é maior que a quantidade atual do depósito."));
        }

        [Test]
        public async Task UpdateProductWarehouseQuantityAsync_DoesntExistsWithOutputOperation_DontCreate()
        {
            // Arrange
            var productMovimentationDto = new ProductMovimentationDto(1, 1, 10, eMovementType.Output);
            ProductWarehouseQuantity productWarehouseQuantity = null;

            _productWarehouseQuantityRepositoryMock.Setup(s => s.GetByProductMovimentationAsync(It.IsAny<ProductMovimentationDto>()))
                .ReturnsAsync(productWarehouseQuantity);

            // Act
            var result = await _sut.UpdateProductWarehouseQuantityAsync(productMovimentationDto);

            // Assert
            result.Should().BeFalse();
            _productWarehouseQuantityRepositoryMock.Verify(s => s.CreateAsync(It.IsAny<ProductWarehouseQuantity>()), Times.Never);
        }

        [Test]
        public async Task UpdateProductWarehouseQuantityAsync_DoesntExistsWithInputOperation_Create()
        {
            // Arrange
            var productMovimentationDto = new ProductMovimentationDto(1, 1, 10, eMovementType.Input);
            ProductWarehouseQuantity productWarehouseQuantity = null;

            _productWarehouseQuantityRepositoryMock.Setup(s => s.GetByProductMovimentationAsync(It.IsAny<ProductMovimentationDto>()))
                .ReturnsAsync(productWarehouseQuantity);

            // Act
            await _sut.UpdateProductWarehouseQuantityAsync(productMovimentationDto);

            // Assert
            _productWarehouseQuantityRepositoryMock.Verify(v => v.UpdateProductWarehouseQuantityAsync(productMovimentationDto, productMovimentationDto.Quantity), Times.Never);
        }
    }
}
