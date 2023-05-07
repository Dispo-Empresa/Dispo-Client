using Dispo.Infrastructure.DTOs;
using Dispo.Service.DTOs.RequestDTOs;
using Dispo.Service.DTOs.ResponseDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IProviderService
    {
        ResponseDto CreateProvider(ProviderRequestDto providerRequestDto);
    }
}