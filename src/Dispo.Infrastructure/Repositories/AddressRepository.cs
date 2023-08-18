using Dispo.Domain.Dtos;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class AddressRepository : BaseRepository<Address>, IAddressRepository
    {
        private readonly DispoContext dispoContext;

        public AddressRepository(DispoContext dispoContext)
            : base(dispoContext)
        {
            this.dispoContext = dispoContext;
        }

        public IEnumerable<WarehouseAddressDto> GetFormattedAddresses()
        {
            return dispoContext.Addresses.Select(w => new WarehouseAddressDto
            {
                AddressId = w.Id,
                Address = w.ToString(),
            });
        }
    }
}