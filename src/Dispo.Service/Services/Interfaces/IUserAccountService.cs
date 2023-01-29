using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IUserAccountService
    {
        UserAccountResponseDto UpdateUserAccountInfo(UserAccountResponseDto userAccountModel);
    }
}