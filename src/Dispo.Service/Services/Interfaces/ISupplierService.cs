using Dispo.Domain.DTOs.Request;

namespace Dispo.Service.Services.Interfaces
{
    public interface ISupplierService
    {
        long CreateSupplier(SupplierRequestDto supplierRequestDto);
    }
}
