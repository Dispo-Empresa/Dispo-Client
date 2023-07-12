using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Token.Interfaces
{
    public interface ITokenGenerator
    {
        //TokenResponseDto GenerateJwtToken(long accountId);
        string GenerateJwtToken(long id);
    }
}