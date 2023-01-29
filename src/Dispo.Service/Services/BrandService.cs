using Dispo.Domain.Entities;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;

namespace Dispo.Service.Services
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;

        public BrandService(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        public BrandResponseDto CreateBrand(BrandRequestDto brandModel)
        {
            var newBrand = new Brand();
            newBrand.Name = brandModel.Name;
            newBrand.Logo = new byte[1];

            var brandCreated = _brandRepository.Create(newBrand);

            return new BrandResponseDto()
            {
                Id = brandCreated.Id,
                Name = brandCreated.Name,
                Logo = brandCreated.Logo
            };
        }

        public IList<string> GetBrandNames()
        {
            return _brandRepository.GetAllBrandNames();
        }
    }
}