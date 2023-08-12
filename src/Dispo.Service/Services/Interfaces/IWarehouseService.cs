using Dispo.Domain.Dtos;
using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Entities;

namespace Dispo.Service.Services.Interfaces
{
    public interface IWarehouseService
    {
        void CreateWarehouse(WarehouseRequestDto warehouseRequestDto);
    }
}