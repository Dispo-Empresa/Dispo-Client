using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IBranchRepository : IBaseRepository<Branch>
    {
        bool ExistsByLocationId(long locationId);
    }
}