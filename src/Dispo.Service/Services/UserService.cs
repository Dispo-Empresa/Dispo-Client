using Dispo.Domain.Entities;
using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace Dispo.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IMemoryCache memoryCache;

        public UserService(IUserRepository userRepository, IMemoryCache memoryCache)
        {
            this.userRepository = userRepository;
            this.memoryCache = memoryCache;
        }

        public async Task<User?> GetByIdAsync(long id)
        {
            return await memoryCache.GetOrCreateAsync(id, async entry =>
            {
                entry.AbsoluteExpiration = DateTime.UtcNow.AddMinutes(10);
                return await userRepository.GetByIdAsync(id);
            });
        }
    }
}