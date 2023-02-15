using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class BranchRepository : BaseRepository<Branch>, IBranchRepository
    {
        private readonly DispoContext _context;

        public BranchRepository(DispoContext dispoContext) : base(dispoContext)
        {
            _context = dispoContext;
        }

        public bool ExistsByLocationId(long locationId)
            => _context.Branches.Any(x => x.LocationId == locationId);
    }
}