using Dispo.Domain.DTOs.RequestDTOs;
using Dispo.Service.DTOs.RequestDTOs;

namespace Dispo.Service.Services.Interfaces
{
    public interface IMovementService
    {
        Task MoveProductAsync(ProductMovimentationDto productMovimentationDto);
    }
}