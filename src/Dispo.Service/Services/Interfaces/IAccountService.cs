using Dispo.Domain.DTOs.Request;
using Dispo.Domain.DTOs.Response;

namespace Dispo.Service.Services.Interfaces
{
    public interface IAccountService
    {
        SignInResponseDto AuthenticateByEmailAndPassword(string email, string password);

        UserResponseDto CreateAccountAndUser(SignUpRequestDto signUpModel);

        void ResetPassword(long accountId, string newPassword);

        UserAccountResponseDto UpdateUserAccountInfo(UserAccountResponseDto userAccountModel);
    }
}