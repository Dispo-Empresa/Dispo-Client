using Dispo.Domain.Entities;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IBrandRepository : IBaseRepository<Brand>
    {
        IList<string> GetAllBrandNames();

        long GetBrandIdByName(string brandName);
    }
}