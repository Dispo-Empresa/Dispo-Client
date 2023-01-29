using Dispo.Infrastructure.Repositories.Interfaces;
using Dispo.Service.Services.Interfaces;

namespace Dispo.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
    }
}