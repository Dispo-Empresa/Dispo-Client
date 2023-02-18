using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.DTOs;
using Dispo.Infrastructure.Repositories.Interfaces;

namespace Dispo.Infrastructure.Repositories
{
    public class ProviderRepository : BaseRepository<Provider>, IProviderRepository
    {
        private readonly DispoContext _dispoContext;

        public ProviderRepository(DispoContext dispoContext) : base(dispoContext)
        {
            _dispoContext = dispoContext;
        }

        public IEnumerable<ProviderDto> GetAllProvidersInfo()
            => _dispoContext.Providers
                            .Select(b => new ProviderDto()
                            {
                                Name = b.Name,
                                Cnpj= b.Cnpj,
                            })
                            .ToList();
    }
}