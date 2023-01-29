using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Dispo.Infrastructure.Repositories
{
    public class BranchRepository : BaseRepository<Branch>, IBranchRepository
    {
        private readonly DispoContext _context;

        public BranchRepository(DispoContext dispoContext) : base(dispoContext)
        {
            _context = dispoContext;
        }

        public async Task<bool> ExistsByLocationId(long locationId)
            => await _context.Branches.AnyAsync(x => x.LocationId == locationId);
    }
}