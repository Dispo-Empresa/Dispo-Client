using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class AddressRepository : BaseRepository<Address>, IAddressRepository
    {
        public AddressRepository(DispoContext dispoContext) : base(dispoContext)
        {
        }
    }
}
