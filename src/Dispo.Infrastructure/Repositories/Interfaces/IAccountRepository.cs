using Dispo.Domain.Entities;
using Dispo.Infrastructure.Repositories.DTO_s;

namespace Dispo.Infrastructure.Repositories.Interfaces
{
    public interface IAccountRepository : IBaseRepository<Account>
    {
        Task<bool> ExistsByEmailAndPassword(string email, string password);

        Task<Account?> GetUserWithAccountByEmailAndPassword(string email, string password);

        Task ResetPassword(Account account, string newPassword);

        Task<long> GetAccountIdByEmail(string email);

        Task<UserInfoResponseDto> GetUserInfoResponseDto(long id);
    }
}