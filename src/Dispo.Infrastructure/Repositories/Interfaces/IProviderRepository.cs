using Dispo.Domain.Entities;
using Dispo.Infrastructure.DTOs;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IProviderRepository : IBaseRepository<Provider>
    {
        IEnumerable<ProviderDto> GetAllProvidersInfo();
    }
}