using Dispo.Domain.Dtos;
using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IWarehouseRepository : IBaseRepository<Warehouse>
    {
        IEnumerable<WarehouseAddressDto> GetWarehousesWithAddressByAccountId(long accountId);

        IEnumerable<WarehouseAddressDto> GetWarehousesWithAddress();
        IEnumerable<WarehouseInfoDto> GetWarehouseInfo();
        string GetNameById(long id);
        bool ExistsByAddressId(long addressId);
    }
}