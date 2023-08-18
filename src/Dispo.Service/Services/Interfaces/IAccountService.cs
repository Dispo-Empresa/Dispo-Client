using Dispo.Domain.DTOs.Request;
using Dispo.Domain.DTOs.Response;
using Dispo.Domain.Entities;

namespace Dispo.Service.Services.Interfaces
{
    public interface IAccountService
    {
        Task<Account?> GetByIdAsyncFromCache(long id);
        SignInResponseDto AuthenticateByEmailAndPassword(string email, string password);

        UserResponseDto CreateAccountAndUser(SignUpRequestDto signUpModel);

        void ResetPassword(long accountId, string newPassword);

        UserAccountResponseDto UpdateUserAccountInfo(UserAccountResponseDto userAccountModel);
        void LinkWarehouses(List<long> warehouseIds, long userId);
        void ChangeWarehouse(long userId, long warehouseId);
    }
}