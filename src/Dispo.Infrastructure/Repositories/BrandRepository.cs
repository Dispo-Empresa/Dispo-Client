using Dispo.Commom;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class BrandRepository : BaseRepository<Brand>, IBrandRepository
    {
        private readonly DispoContext _dispoContext;

        public BrandRepository(DispoContext dispoContext) : base(dispoContext)
        {
            _dispoContext = dispoContext;
        }

        public IList<string> GetAllBrandNames()
            => _dispoContext.Brands
                            .Select(b => b.Name)
                            .ToList();

        public long GetBrandIdByName(string brandName)
            => _dispoContext.Brands
                            .Where(x => x.Name == brandName)
                            .Select(s => s.Id)
                            .SingleOrDefault()
                            .ToLong();
    }
}