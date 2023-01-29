using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Token.Interfaces
{
    public interface ITokenGenerator
    {
        TokenResponseDto GenerateToken(long accountId);
    }
}