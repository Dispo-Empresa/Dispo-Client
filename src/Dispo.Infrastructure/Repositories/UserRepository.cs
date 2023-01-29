using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;
using System.Linq.Expressions;

namespace Dispo.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly DispoContext _dispoContext;

        public UserRepository(DispoContext dispoContext) : base(dispoContext)
        {
            _dispoContext = dispoContext;
        }

        private Expression<Func<User, bool>> ExpExistsByCpfCnpj(string cpfCnpj)
            => w => w.CpfCnpj.Equals(cpfCnpj);

        public bool ExistsByCpfCnpj(string cpfCnpj)
            => _dispoContext.Users
                            .Any(ExpExistsByCpfCnpj(cpfCnpj));

        public User? GetUserByAccountId(long accountId)
            => _dispoContext.Users
                            .FirstOrDefault(x => x.AccountId == accountId);
    }
}