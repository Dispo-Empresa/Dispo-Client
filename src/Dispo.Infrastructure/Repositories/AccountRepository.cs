using Dispo.Commom;
using Dispo.Domain.Entities;
using Dispo.Infrastructure.Context;
using Dispo.Infrastructure.Repositories.DTO_s;
using Dispo.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Dispo.Infrastructure.Repositories
{
    public class AccountRepository : BaseRepository<Account>, IAccountRepository
    {
        private readonly DispoContext _dispoContext;

        public AccountRepository(DispoContext dispoContext)
            : base(dispoContext)
        {
            _dispoContext = dispoContext;
        }

        #region Expressions

        private Expression<Func<Account, bool>> ExpBySignInModel(string email, string password)
            => exp => exp.Email.Equals(email) && exp.Password.Equals(password);

        private Expression<Func<Account, bool>> ExpById(long accountId)
            => exp => exp.Id.Equals(accountId);

        #endregion Expressions

        public async Task<bool> ExistsByEmailAndPassword(string email, string password)
        {
            return await _dispoContext.Accounts
                                      .AnyAsync(ExpBySignInModel(email, password));
        }

        public async Task<Account?> GetUserWithAccountByEmailAndPassword(string email, string password)
        {
            return await _dispoContext.Accounts
                                      .Include(x => x.User)
                                      .FirstOrDefaultAsync(ExpBySignInModel(email, password));
        }

        public async Task ResetPassword(Account account, string newPassword)
        {
            _dispoContext.Entry(account).State = EntityState.Modified;
            account.Password = newPassword;
            await _dispoContext.SaveChangesAsync();
        }

        public async Task<long> GetAccountIdByEmail(string email)
            => (await _dispoContext.Accounts.Where(x => x.Email == email)
                                            .Select(s => s.Id)
                                            .SingleOrDefaultAsync())
                                            .ToLong();

        public async Task<UserInfoResponseDto> GetUserInfoResponseDto(long id)
            => await _dispoContext.Accounts.Where(x => x.Id == id)
                                           .Include(x => x.User)
                                           .Select(s => new UserInfoResponseDto()
                                           {
                                               Email = s.Email,
                                               FirstName = s.User.FirstName,
                                               LastName = s.User.LastName,
                                               CpfCnpj = s.User.CpfCnpj,
                                               Phone = s.User.Phone,
                                               BirthDate = s.User.BirthDate
                                           })
                                           .SingleOrDefaultAsync() ?? new UserInfoResponseDto();
    }
}