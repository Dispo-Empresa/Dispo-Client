using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> ExistsByCpfCnpj(string cpfCnpj)
            => await _dispoContext.Users
                                  .AnyAsync(ExpExistsByCpfCnpj(cpfCnpj));

        public async Task<User?> GetUserByAccountId(long accountId)
            => await _dispoContext.Users
                                  .FirstOrDefaultAsync(x => x.AccountId == accountId);
    }
}