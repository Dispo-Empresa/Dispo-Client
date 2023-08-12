using Dispo.Domain.Dtos;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;

namespace Dispo.Service.Services
{
    public class AddressService : IAddressService
    {
        private readonly IAddressRepository addressRepository;

        public AddressService(IAddressRepository addressRepository)
        {
            this.addressRepository = addressRepository;
        }

        public IList<WarehouseAddressDto> GetFormattedAddresses()
        {
            return addressRepository.GetFormattedAddresses()
                                    .ToList();
        }
    }
}