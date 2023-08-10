using Dispo.Domain.DTOs.Response;

namespace Dispo.Service.Token.Interfaces
{
    public interface ITokenGenerator
    {
        TokenInfoDto GenerateJwtToken(long id);
    }
}