using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IBranchRepository : IBaseRepository<Branch>
    {
        Task<bool> ExistsByLocationId(long locationId);
    }
}