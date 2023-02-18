using Dispo.Domain.Entities;
using Dispo.Infrastructure.DTOs;
using Dispo.Infrastructure.Repositories;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;
using Dispo.Service.Services.Interfaces;

namespace Dispo.Service.Services
{
    public class ProviderService : IProviderService
    {
        private readonly IProviderRepository _providerRepository;

        public ProviderService(IProviderRepository providerRepository)
        {
            _providerRepository = providerRepository;
        }

        public ResponseDto CreateProvider(ProviderRequestDto providerRequestDto)
        {
            var newProvider = new Provider();
            newProvider.Name = providerRequestDto.Name;
            newProvider.Cnpj = providerRequestDto.Cnpj;

            var providerCreated = _providerRepository.Create(newProvider);

            return new ResponseDto()
            {
                Id= newProvider.Id,
                IsSuccess= true,
            };
        }

        public IEnumerable<ProviderDto> GetProvidersInfo()
        {
            return _providerRepository.GetAllProvidersInfo();
        }
    }
}