using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IAccountService
    {
        Task<UserAccountResponseDto> GetUserWithAccountByEmailAndPassword(string email, string password);

        Task<UserResponseDto> CreateAccountAndUser(SignUpRequestDto signUpModel);

        Task ResetPassword(long accountId, string newPassword);

        Task<UserAccountResponseDto> UpdateUserAccountInfo(UserAccountResponseDto userAccountModel);
    }
}