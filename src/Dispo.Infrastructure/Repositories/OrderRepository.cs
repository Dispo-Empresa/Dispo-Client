
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class OrderRepository : BaseRepository<Order>, IOrderRepository
    {
        private readonly DispoContext _dispoContext;
        public OrderRepository(DispoContext dispoContext) : base(dispoContext)
        {
            this._dispoContext = dispoContext;
        }
    }
}
