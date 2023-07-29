using AutoMapper;
using Dispo.Commom;
using Dispo.Commom.Extensions;
using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;
using Dispo.Domain.Enums;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        #region Public Methods
        public ProductResponseDto CreateProduct(ProductRequestDto productModel)
        {
            if (_productRepository.GetProductIdByName(productModel.Name).IsIdValid())
                throw new AlreadyExistsException("Já existe o produto informado");

            ProductResponseDto productDto;
            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var product = new Product()
                {
                    Name = productModel.Name,
                    UnitOfMeasurement = EnumExtension.ConvertToEnum(productModel.UnitOfMeasurement, eUnitOfMeasurement.Others),
                    SalePrice = 0,
                    Category = EnumExtension.ConvertToEnum(productModel.Type, eProductCategory.Others),
                    Description = productModel.Description
                };

                var productCreated = _productRepository.Create(product);
                tc.Complete();

                productDto = _mapper.Map<ProductResponseDto>(product);
            }

            return productDto;
        }

        public IEnumerable<ProductNameWithCode> GetProductNamesWithCode()
        {
            return _productRepository.GetAllProductNamesWithCode();
        }

        public string BuildProductSKUCode(string productName, string productType)
        {
            var productNameWords = productName.Split(' ').ToList();
            var productSKUCode = "";

            productNameWords.ForEach(x => productSKUCode += x.Count() > 2 && productName.Count() < 25 ? x.Substring(0, 3) : x.Substring(0, 2));
            productSKUCode += productType.Substring(0, 3);
            productSKUCode += DateTime.Today.Day.ToString() + DateTime.Today.Month.ToString().Count();

            productSKUCode = productSKUCode.ToUpper();

            //if (_productRepository.GetProductIdByCode(productSKUCode).IsIdValid())
            //{
            //    // Ja existe o código
            //}

            return productSKUCode;
        }

        public async Task<bool> ExistsByIdAsync(long productId)
        {
            return await _productRepository.ExistsByIdAsync(productId);
        }

        #endregion
    }
}