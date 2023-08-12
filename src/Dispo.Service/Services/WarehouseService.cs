using Dispo.Domain.DTOs.Request;
using Dispo.Domain.Entities;
using Dispo.Domain.Exceptions;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using System.Transactions;

namespace Dispo.Service.Services
{
    public class WarehouseService : IWarehouseService
    {
        private readonly IWarehouseRepository _warehouseRepository;

        public WarehouseService(IWarehouseRepository warehouseRepository)
        {
            _warehouseRepository = warehouseRepository;
        }

        public void CreateWarehouse(WarehouseRequestDto warehouseRequestDto)
        {
            if (_warehouseRepository.ExistsByAddressId(warehouseRequestDto.AddressId))
                throw new AlreadyExistsException("Já existe um depósito cadastrado nesse endereço.");

            using (var tc = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var warehouse = new Warehouse
                {
                    AddressId = warehouseRequestDto.AddressId,
                    Name = warehouseRequestDto.Name,
                    CompanyId = 1,
                };

                _warehouseRepository.Create(warehouse);
                tc.Complete();
            }
        }
    }
}
