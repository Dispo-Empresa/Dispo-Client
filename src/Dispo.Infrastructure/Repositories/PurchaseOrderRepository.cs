using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class PurchaseOrderRepository : BaseRepository<PurchaseOrder>, IPurchaseOrderRepository
    {
        private readonly DispoContext _dispoContext;
        public PurchaseOrderRepository(DispoContext dispoContext) : base(dispoContext)
        {
            this._dispoContext = dispoContext;
        }
    }
}
