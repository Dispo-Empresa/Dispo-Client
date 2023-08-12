using Dispo.Domain.Dtos;

namespace Dispo.Service.Services.Interfaces
{
    public interface IAddressService
    {
        IList<WarehouseAddressDto> GetFormattedAddresses();
    }
}