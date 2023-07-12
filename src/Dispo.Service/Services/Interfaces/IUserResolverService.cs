using Dispo.Domain.Entities;

namespace Dispo.Service.Services.Interfaces
{
    public interface IUserResolverService
    {
        Task<User?> GetLoggedUser();
    }
}
