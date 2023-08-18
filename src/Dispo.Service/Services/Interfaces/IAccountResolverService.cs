using Dispo.Domain.Entities;

namespace Dispo.Service.Services.Interfaces
{
    public interface IAccountResolverService
    {
        long? GetLoggedAccountId();
    }
}