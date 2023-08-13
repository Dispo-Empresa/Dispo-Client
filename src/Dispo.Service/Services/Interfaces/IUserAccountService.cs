using Dispo.Domain.DTOs.Response;

namespace Dispo.Service.Services.Interfaces
{
    public interface IUserAccountService
    {
        UserAccountResponseDto UpdateUserAccountInfo(long id, UserAccountResponseDto userAccountModel);
    }
}