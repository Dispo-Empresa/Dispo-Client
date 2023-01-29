using AutoMapper;
using Dispo.Commom;
using Dispo.Domain.Entities;
using Dispo.Domain.Enums;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.DTO_s;
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
        private readonly IBrandRepository _brandRepository;

        public ProductService(IProductRepository productRepository, IMapper mapper, IBrandRepository brandRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _brandRepository = brandRepository;
        }

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
                    Code = BuildProductSKUCode(productModel.Name, productModel.Type),
                    BrandId = _brandRepository.GetBrandIdByName(productModel.BrandName),
                    UnitOfMeasurement = UoMConverter(productModel.UnitOfMeasurement),
                    UnitPrice = productModel.UnitPrice,
                    Color = ColorConverter(productModel.Color),
                    InventoryId = productModel.InventoryId,
                    Type = ProductTypeConverter(productModel.Type),
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

            productNameWords.ForEach(x => productSKUCode += x.Count() > 2 ? x.Substring(0, 3) : x.Substring(0, 2));
            productSKUCode += productType.Substring(0, 4);
            productSKUCode += DateTime.Today.Day.ToString() + DateTime.Today.Month.ToString().Count();

            productSKUCode = productSKUCode.ToUpper();

            if (_productRepository.GetProductIdByCode(productSKUCode).IsIdValid())
            {
                // Ja existe o código
            }

            return productSKUCode;
        }

        /////////////////////////////////////////////////////
        // Melhor colocar os métodos abaixo em outro lugar???
        /////////////////////////////////////////////////////

        public eUnitOfMeasurement UoMConverter(string uom)
        {
            if (uom == "Meter")
            {
                return eUnitOfMeasurement.Meter;
            }
            else if (uom == "Liter")
            {
                return eUnitOfMeasurement.Liter;
            }
            else if (uom == "Kilo")
            {
                return eUnitOfMeasurement.Kilo;
            }
            else if (uom == "Gram")
            {
                return eUnitOfMeasurement.Gram;
            }
            else if (uom == "Unit")
            {
                return eUnitOfMeasurement.Unit;
            }

            return eUnitOfMeasurement.Others;
        }

        public eColor ColorConverter(string color)
        {
            if (color == "Amarelo")
            {
                return eColor.Yellow;
            }
            else if (color == "Vermelho")
            {
                return eColor.Red;
            }
            else if (color == "Roxo")
            {
                return eColor.Purple;
            }
            else if (color == "Azul")
            {
                return eColor.Blue;
            }
            else if (color == "Verde")
            {
                return eColor.Green;
            }
            else if (color == "Branco")
            {
                return eColor.White;
            }
            else if (color == "Preto")
            {
                return eColor.Black;
            }

            return eColor.Black;
        }

        public eProductType ProductTypeConverter(string productType)
        {
            if (productType == "Comida")
            {
                return eProductType.Food;
            }
            else if (productType == "Roupas")
            {
                return eProductType.Clothes;
            }
            else if (productType == "Eletronico")
            {
                return eProductType.Eletronics;
            }
            else if (productType == "Livro")
            {
                return eProductType.Books;
            }

            return eProductType.Others;
        }
    }
}