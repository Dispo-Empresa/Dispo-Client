using Dispo.Domain.Dtos;
using Dispo.Domain.DTOs;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Dispo.Infrastructure.Repositories
{
    public class WarehouseRepository : BaseRepository<Warehouse>, IWarehouseRepository
    {
        private readonly DispoContext _dispoContext;

        public WarehouseRepository(DispoContext dispoContext)
            : base(dispoContext)
        {
            _dispoContext = dispoContext;
        }

        #region Expressions

        private Expression<Func<Warehouse, bool>> ExpByAddressId(long addressId)
            => exp => exp.AddressId.Equals(addressId);

        #endregion Expressions

        public IEnumerable<WarehouseAddressDto> GetWarehousesWithAddressByAccountId(long accountId)
            => _dispoContext.WarehouseAccounts.Include(i => i.Warehouse)
                                              .ThenInclude(i => i.Address)
                                              .Where(w => w.AccountId == accountId)
                                              .Include(i => i.Account)
                                              .Select(s => new WarehouseAddressDto
                                              {
                                                  Address = (s.Warehouse != null && s.Warehouse.Address != null) ? s.Warehouse.Address.ToString() : string.Empty,
                                                  AddressId = (s.Warehouse != null && s.Warehouse.Address != null) ? s.Warehouse.Address.Id : 0,
                                                  Name = (s.Warehouse != null) ? s.Warehouse.Name : string.Empty,
                                                  WarehouseId = s.WarehouseId,
                                                  CurrentWarehouse = s.Account.CurrentWarehouseId.HasValue && s.Account.CurrentWarehouseId.Value == s.WarehouseId,
                                              })
                                              .ToList();

        public IEnumerable<WarehouseAddressDto> GetWarehousesWithAddress()
            => _dispoContext.Warehouses.Include(i => i.Address)
                                          .Select(s => new WarehouseAddressDto
                                          {
                                              Address = (s.Address != null) ? s.Address.ToString() : string.Empty,
                                              AddressId = s.AddressId,
                                              Name = s.Name,
                                              WarehouseId = s.Id,
                                          })
                                          .ToList();

        public IEnumerable<WarehouseInfoDto> GetWarehouseInfo()
            => _dispoContext.Warehouses.Select(s => new WarehouseInfoDto
                                       {
                                           WarehouseId = s.Id,
                                           Name = s.Name
                                       })
                                       .ToList();

        public string GetNameById(long id)
            => _dispoContext.Warehouses.Where(x => x.Id == id)
                                       .Select(s => s.Name)
                                       .FirstOrDefault() ?? string.Empty;

        public bool ExistsByAddressId(long addressId)
            => _dispoContext.Warehouses.Any(ExpByAddressId(addressId));
    }
}