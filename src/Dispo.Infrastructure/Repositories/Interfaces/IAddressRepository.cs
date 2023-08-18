using Dispo.Domain.Dtos;
using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IAddressRepository : IBaseRepository<Address>
    {
        IEnumerable<WarehouseAddressDto> GetFormattedAddresses();
    }
}