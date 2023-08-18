using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class WarehouseAccountRepository : BaseRepository<WarehouseAccount>, IWarehouseAccountRepository
    {
        public WarehouseAccountRepository(DispoContext dispoContext) : base(dispoContext)
        {
        }
    }
}