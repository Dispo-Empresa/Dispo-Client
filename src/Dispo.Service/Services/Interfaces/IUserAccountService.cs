using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IUserAccountService
    {
        Task<UserAccountResponseDto> UpdateUserAccountInfo(UserAccountResponseDto userAccountModel);
    }
}