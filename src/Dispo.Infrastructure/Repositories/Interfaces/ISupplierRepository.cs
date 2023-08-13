using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface ISupplierRepository : IBaseRepository<Supplier>
    {
        IEnumerable<SupplierInfoDto> GetSupplierInfoDto();
        long GetSupplierIdByName(string supplierName);
    }
}
